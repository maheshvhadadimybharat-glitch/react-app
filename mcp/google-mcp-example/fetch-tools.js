// Example: query a Google Design MCP server for available tools (JSON-RPC)
const https = require('https');
const { URL } = require('url');

const MCP_URL = process.argv[2] || 'https://design.googleapis.com/mcp';
const AUTH = process.env.GOOGLE_MCP_AUTH || ''; // e.g. 'Bearer <ACCESS_TOKEN>'

const payload = JSON.stringify({ method: 'tools/list', jsonrpc: '2.0', id: 1 });

function post(urlStr, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const opts = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      port: url.port || 443,
      headers: Object.assign({ 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream', 'Content-Length': Buffer.byteLength(body) }, headers),
    };

    const req = https.request(opts, (res) => {
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode && (res.statusCode < 200 || res.statusCode >= 300)) {
          return reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

(async () => {
  try {
    const headers = {};
    if (AUTH) headers.Authorization = AUTH;

    console.log('Querying MCP:', MCP_URL);
    const resp = await post(MCP_URL, payload, headers);
    console.log('Response (truncated):');
    if (resp && resp.result && Array.isArray(resp.result.tools)) {
      console.log('Tools available:', resp.result.tools.map((t) => t.name || t.id).slice(0, 30));
    } else {
      console.log(JSON.stringify(resp, null, 2));
    }
  } catch (err) {
    console.error('Failed to query MCP:', err.message || err);
    process.exit(1);
  }
})();
