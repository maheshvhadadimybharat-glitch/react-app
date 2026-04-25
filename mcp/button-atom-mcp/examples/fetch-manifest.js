// Node example: fetch and print the Button atom manifest
const http = require('http');
const https = require('https');
const url = process.argv[2] || 'http://localhost:4300/atoms/button';

function fetchUrl(u) {
  return new Promise((resolve, reject) => {
    const lib = u.startsWith('https') ? https : http;
    lib.get(u, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        return reject(new Error('Status Code: ' + res.statusCode));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const raw = await fetchUrl(url);
    const json = JSON.parse(raw);
    console.log('Manifest id:', json.id);
    console.log('Name:', json.name);
    console.log('Props:', Object.keys(json.props || {}).join(', '));
    console.log('\nFull manifest:\n', JSON.stringify(json, null, 2));
  } catch (err) {
    console.error('Failed to fetch manifest:', err.message);
    process.exit(1);
  }
})();
