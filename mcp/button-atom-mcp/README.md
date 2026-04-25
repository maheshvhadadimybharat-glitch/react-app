MCP Server — Button Atom

This minimal MCP server exposes the Button atom manifest and source so workspace tools can discover and consume the atom.

Run locally

```bash
cd mcp/button-atom-mcp
npm install
npm start
```

By default the server listens on port `4300`. To override:

```bash
PORT=4500 npm start
```

Endpoints

- `GET /` — server info (name, available atoms, manifestUrl)
- `GET /atoms/button` — JSON manifest (same content as `button.json`)
- `GET /atoms/button/code` — TSX source for the Button component

Manifest (discovery)

- Local file: `mcp/button-atom-mcp/button.json` (can be used offline)
- Local URL (when server running): `http://localhost:4300/atoms/button`

Workspace registration

We added a workspace registry at `/.mcp/registry.json` that points to this MCP by both `manifestFile` and `manifestUrl`. Tools should prefer `manifestUrl` when the server is running and fall back to `manifestFile` when offline.

Validation

Run the included validator which checks the local `button.json` and attempts to fetch the `manifestUrl`:

```bash
cd mcp/button-atom-mcp
npm run validate-manifest
```

CI

A GitHub Actions workflow runs the manifest validator on push/PR for changes under `mcp/**` and `.mcp/**`.

Troubleshooting

- `RequestFailed` when fetching the manifest: ensure the MCP server is running and reachable on the configured `PORT`, or configure the client to use the `manifestFile` fallback.
- Manifest mismatch: run the validator locally to compare `button.json` with the remote manifest.

Badge

![Validate MCP Manifests](https://github.com/maheshv13/button/actions/workflows/validate-mcp-manifest.yml/badge.svg)

Examples — fetch manifest

1) Using `curl` + `jq` (shell)

```bash
# fetch and pretty-print (defaults to localhost)
cd mcp/button-atom-mcp
./examples/fetch-manifest.sh http://localhost:4300/atoms/button
```

2) Using Node.js (no external deps)

```bash
cd mcp/button-atom-mcp/examples
node fetch-manifest.js http://localhost:4300/atoms/button
```

These examples demonstrate a simple client fetching the manifest JSON, printing key metadata, and showing how a consumer could inspect available props and example usage.
