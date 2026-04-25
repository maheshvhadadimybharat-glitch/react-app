const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4300;

const buttonManifest = {
  id: 'button',
  name: 'Button',
  description: 'Atom Button component: label, variant, onClick',
  props: {
    label: { type: 'string', default: 'Click me' },
    variant: { type: 'string', enum: ['primary', 'secondary'], default: 'primary' },
    onClick: { type: 'function', description: 'Click handler' }
  },
  example: "<Button label=\"Add\" variant=\"primary\"/>",
  source: '/atoms/button/code'
};

const buttonCode = `import React from "react";

interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

const Button = ({ label, variant = 'primary', onClick }: ButtonProps) => {
  const styles = {
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
    fontWeight: 'bold',
    margin: '5px',
    backgroundColor: variant === 'primary' ? '#007bff' : '#6c757d',
    color: 'white',
  } as React.CSSProperties;

  return (
    <button style={styles} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;`;

app.get('/', (req, res) => {
  res.json({ name: 'MCP Button Atom Server', atoms: ['button'], manifestUrl: '/atoms/button' });
});

app.get('/atoms/button', (req, res) => {
  res.json(buttonManifest);
});

app.get('/atoms/button/code', (req, res) => {
  res.type('text/plain').send(buttonCode);
});

app.listen(PORT, () => console.log(`MCP server running on http://localhost:${PORT}`));
