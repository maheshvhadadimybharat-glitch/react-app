Google Design MCP example

This folder contains a small Node example that demonstrates how to query the
Google Design MCP endpoint for available tools using the JSON-RPC `tools/list`
method.

Usage

1. Install (no deps required): Node.js 18+ recommended.
2. Provide authentication: the Google Design MCP requires enabling MCP servers
   and authentication. Obtain an access token or API key as described in the
   Google docs: https://developers.google.com/design-mcp

Example (with Bearer token):

```bash
export GOOGLE_MCP_AUTH='Bearer YOUR_ACCESS_TOKEN'
node fetch-tools.js https://design.googleapis.com/mcp
```

If you omit `GOOGLE_MCP_AUTH`, the script will attempt the request unauthenticated
and will likely fail with an authentication error.

See the Google MCP reference for details on authentication and available tools:
https://developers.google.com/design-mcp/reference/mcp
