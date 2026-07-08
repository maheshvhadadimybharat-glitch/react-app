import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(process.cwd(), ".env")
});

const FIGMA_TOKEN = process.env.FIGMA_TOKEN as string;
const FILE_ID = process.env.FIGMA_FILE_ID as string;

if (!FIGMA_TOKEN || !FILE_ID) {
  throw new Error("Missing FIGMA_TOKEN or FIGMA_FILE_ID");
}

// ----------------------
// Helpers
// ----------------------

function rgbaToHex({ r, g, b }: any): string {
  const to255 = (v: number) => Math.round(v * 255);
  return `#${[r, g, b]
    .map(to255)
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("")}`;
}

function normalize(name: string): string {
  return name.toLowerCase().replace(/\s+/g, "").replace(/\//g, "");
}

function addUniqueToken(obj: any, value: any, baseName: string) {
  const key = JSON.stringify(value);

  if (!obj.__map) obj.__map = new Map();
  if (obj.__map.has(key)) return;

  obj.__map.set(key, true);

  let name = baseName;
  let i = 1;

  while (obj[name]) {
    name = `${baseName}_${i++}`;
  }

  obj[name] = value;
}

// ----------------------
// Fetch Figma File
// ----------------------

async function fetchFile() {
  const res = await axios.get(
    `https://api.figma.com/v1/files/${FILE_ID}`,
    {
      headers: {
        "X-Figma-Token": FIGMA_TOKEN
      }
    }
  );

  return res.data;
}

// ----------------------
// Extract Tokens
// ----------------------

function extractTokens(data: any) {
  const tokens: any = {
    color: {},
    typography: {},
    radius: {},
    spacing: {}
  };

  const styles = data.styles || {};
  const pages = data.document.children || [];

  const TARGET_PAGES = ["tokens", "styles", "design system"];

  const filteredPages = pages.filter((page: any) =>
    TARGET_PAGES.some((name) =>
      page.name.toLowerCase().includes(name)
    )
  );

  // ----------------------
  // Walker
  // ----------------------

  function walk(node: any) {
    const nodeName = (node.name || "").toLowerCase();

    // Skip noise but still traverse children
    if (
      nodeName.includes("icon") ||
      nodeName.includes("vector") ||
      nodeName.includes("image")
    ) {
      if (node.children) node.children.forEach(walk);
      return;
    }

    // 🎨 COLOR
    if (
      node.styles?.fill &&
      node.fills?.length > 0 &&
      node.fills[0].type === "SOLID"
    ) {
      const style = styles[node.styles.fill];
      const fill = node.fills[0];

      if (style && fill?.color) {
        const name = normalize(style.name);
        const value = rgbaToHex(fill.color);

        if (!tokens.color[name]) {
          tokens.color[name] = value;
        }
      }
    }

    // 🔤 TYPOGRAPHY
    if (
      node.type === "TEXT" &&
      node.style?.fontSize &&
      node.style.fontSize >= 12
    ) {
      const s = node.style;

      const value = {
        fontSize: `${s.fontSize}px`,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeightPx
          ? `${s.lineHeightPx}px`
          : "normal",
        fontFamily: s.fontFamily
      };

      const name = `text_${s.fontSize}_${s.fontWeight}`;

      addUniqueToken(tokens.typography, value, name);
    }

    // 📦 RADIUS
    if (
      typeof node.cornerRadius === "number" &&
      node.cornerRadius > 0 &&
      node.cornerRadius <= 32
    ) {
      const value = `${node.cornerRadius}px`;
      const name = `radius_${node.cornerRadius}`;

      addUniqueToken(tokens.radius, value, name);
    }

    // 📏 SPACING
    if (node.layoutMode) {
      const gap = node.itemSpacing || 0;

      const pt = node.paddingTop || 0;
      const pr = node.paddingRight || 0;
      const pb = node.paddingBottom || 0;
      const pl = node.paddingLeft || 0;

      const sum = pt + pr + pb + pl;

      if (gap > 0 || sum > 0) {
        const value = {
          padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
          gap: `${gap}px`
        };

        const name = `space_${gap || sum}`;

        addUniqueToken(tokens.spacing, value, name);
      }
    }

    // Traverse children
    if (node.children) {
      node.children.forEach(walk);
    }
  }

  // Run walker
  (filteredPages.length ? filteredPages : pages).forEach((page: any) => {
    walk(page);
  });

  // Cleanup internal maps
  delete tokens.typography.__map;
  delete tokens.spacing.__map;
  delete tokens.radius.__map;

  console.log("Typography:", Object.keys(tokens.typography).length);
  console.log("Radius:", Object.keys(tokens.radius).length);
  console.log("Spacing:", Object.keys(tokens.spacing).length);

  return tokens;
}

// ----------------------
// MCP Builder
// ----------------------

function buildMCP(tokens: any) {
  return {
    meta: {
      source: "figma",
      version: "1.0.0"
    },
    tokens,
    components: {}
  };
}

// ----------------------
// Main
// ----------------------

async function run() {
  console.log("🚀 Fetching Figma file...");

  const data = await fetchFile();

  console.log("🎨 Extracting tokens...");
  const tokens = extractTokens(data);

  const mcp = buildMCP(tokens);

  fs.writeFileSync(
    "./src/mcp/mcp.json",
    JSON.stringify(mcp, null, 2)
  );

  console.log("✅ MCP generated at src/mcp/mcp.json");
}

run().catch(console.error);