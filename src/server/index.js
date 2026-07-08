import express from "express";
import mcp from "../src/mcp/mcp.json";

const app = express();

app.get("/mcp", (req, res) => {
  res.json(mcp);
});

app.listen(4000, () => {
  console.log("MCP server running");
});