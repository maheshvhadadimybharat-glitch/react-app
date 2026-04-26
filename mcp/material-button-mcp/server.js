const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4301;

const materialManifest = {
  id: 'material-button',
  name: 'MaterialButton',
  description: 'Material-style Button with variants, colors, sizes, and ripple effect',
  props: {
    label: { type: 'string', default: 'Click me' },
    variant: { type: 'string', enum: ['contained', 'outlined', 'text'], default: 'contained' },
    color: { type: 'string', enum: ['primary', 'secondary', 'danger'], default: 'primary' },
    size: { type: 'string', enum: ['sm', 'md', 'lg'], default: 'md' },
    onClick: { type: 'function', description: 'Click handler' },
    disabled: { type: 'boolean', default: false }
  },
  example: "<MaterialButton label=\"Save\" variant=\"contained\" color=\"primary\" />",
  source: '/atoms/material-button/code'
};

app.get('/', (req, res) => {
  res.json({ name: 'MCP Material Button Server', atoms: ['material-button'], manifestUrl: '/atoms/material-button' });
});

app.get('/atoms/material-button', (req, res) => {
  res.json(materialManifest);
});

app.get('/atoms/material-button/code', (req, res) => {
  try {
    const codePath = path.join(__dirname, '..', '..', 'src', 'compenents', 'MaterialButton', 'MaterialButton.tsx');
    const code = fs.readFileSync(codePath, 'utf8');
    res.type('text/plain').send(code);
  } catch (err) {
    res.status(500).json({ error: 'Could not read MaterialButton source', details: err.message });
  }
});

app.listen(PORT, () => console.log(`MCP Material Button server running on http://localhost:${PORT}`));
