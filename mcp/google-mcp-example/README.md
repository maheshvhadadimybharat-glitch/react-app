Google Design MCP example

This folder contains a small Node example that demonstrates how to query the
Google Design MCP endpoint for available tools using the JSON-RPC `tools/list`
method.

Usage

1. Node.js 18+ recommended (no extra npm deps required).
2. Authentication: the Google Design MCP requires enabling MCP servers and
   authentication. Obtain an access token or use the `gcloud` CLI credentials.
   See: https://developers.google.com/design-mcp

Environment options (the script prefers these in order):

- `GOOGLE_MCP_AUTH`: full `Authorization` header value (e.g. `Bearer <token>`),
  or just the raw token — the script will prefix `Bearer ` automatically.
- `GOOGLE_MCP_TOKEN` or `GOOGLE_OAUTH_ACCESS_TOKEN`: raw token value.
- If none of the above are set, the script will try `gcloud auth print-access-token`.

Examples

Unix / macOS (bash/zsh):

```bash
export GOOGLE_MCP_AUTH='Bearer YOUR_ACCESS_TOKEN'
node mcp/google-mcp-example/fetch-tools.js https://design.googleapis.com/mcp
```

Windows PowerShell:

```powershell
$env:GOOGLE_MCP_AUTH = 'Bearer YOUR_ACCESS_TOKEN'
node mcp/google-mcp-example/fetch-tools.js https://design.googleapis.com/mcp
```

Providing just the raw token is fine — the script will add the `Bearer ` prefix:

```bash
export GOOGLE_MCP_AUTH='YOUR_ACCESS_TOKEN'
node mcp/google-mcp-example/fetch-tools.js
```

gcloud fallback (interactive dev machines):

```bash
# If you have gcloud installed and are logged-in, the script will use it
node mcp/google-mcp-example/fetch-tools.js
```

If authentication is missing or invalid, the endpoint will likely return an
authentication error. See the Google MCP reference for details:
https://developers.google.com/design-mcp/reference/mcp
