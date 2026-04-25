const fs = require('fs');
const path = require('path');
const http = require('http');
const https = require('https');

function fetchUrl(url, timeout = 3000) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('No URL provided'));
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout }, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('Status Code: ' + res.statusCode));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timed out'));
    });
  });
}

(async function main(){
  try {
    const registryPath = path.resolve(__dirname, '../../.mcp/registry.json');
    const registryExists = fs.existsSync(registryPath);
    let manifestFile = path.resolve(__dirname, 'button.json');
    let manifestUrl = null;

    if (registryExists) {
      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
      const entry = (registry.mcpServers || []).find(e => e.id === 'button-atom-mcp') || (registry.mcpServers || [])[0];
      if (entry) {
        manifestFile = path.resolve(__dirname, '../../', entry.manifestFile || 'mcp/button-atom-mcp/button.json');
        manifestUrl = entry.manifestUrl || null;
      }
    }

    if (!fs.existsSync(manifestFile)) {
      console.error('Manifest file not found:', manifestFile);
      process.exit(2);
    }

    const fileRaw = fs.readFileSync(manifestFile, 'utf8');
    let fileJson;
    try {
      fileJson = JSON.parse(fileRaw);
    } catch (err) {
      console.error('Invalid JSON in manifest file:', err.message);
      process.exit(2);
    }

    const errors = [];
    if (!fileJson.id) errors.push('Missing `id` in manifest');
    if (!fileJson.name) errors.push('Missing `name` in manifest');
    if (!fileJson.props || typeof fileJson.props !== 'object') errors.push('Missing or invalid `props` object in manifest');

    if (manifestUrl) {
      try {
        const remoteRaw = await fetchUrl(manifestUrl, 3000);
        let remoteJson = null;
        try { remoteJson = JSON.parse(remoteRaw); } catch (e) { errors.push('Remote manifest is not valid JSON: ' + e.message); }
        if (remoteJson && remoteJson.id && remoteJson.id !== fileJson.id) {
          errors.push(`Remote manifest id mismatch (local:${fileJson.id} remote:${remoteJson.id})`);
        }
      } catch (err) {
        errors.push('Failed to fetch remote manifest: ' + err.message);
      }
    }

    if (errors.length) {
      console.error('Manifest validation failed:');
      errors.forEach(e => console.error('- ' + e));
      process.exit(1);
    }

    console.log('Manifest validation succeeded: ', manifestFile, manifestUrl ? ` (remote: ${manifestUrl})` : '');
    process.exit(0);

  } catch (err) {
    console.error('Unexpected error:', err.message || err);
    process.exit(3);
  }
})();
