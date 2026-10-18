/** Copyright 2026 - Sarah Smith - MIT License - see root license */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Define port and find the current directory path
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webroot = process.argv[2] ?? __dirname;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.url.toString()}`);
  const p = req.url.toString();
  const filePath = path.join(webroot, p === '/' ? 'index.html' : p);
  if (!isSubPathSecure(webroot, filePath)) {
    console.log(`Illegal path "${filePath}" - is not under web-root: "${webroot}"`);
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end(`400 Illegal path: ${filePath} is outside of webroot`);
    return;
  }
  // Read the local index.html file asynchronously
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // Handle missing file or permission issues
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('500 Internal Server Error: Missing index.html');
      return;
    }
    const contentType = getContentType(filePath);
    // Serve the index.html page with the correct Content-Type header
    res.writeHead(200, getContentType(filePath));
    res.end(content);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server for ${webroot} running at http://localhost:${PORT}/`);
});

function isSubPathSecure(parent, child) {
  try {
    // Resolve true, canonical physical paths (resolves symlinks and relative dots)
    const realParent = fs.realpathSync(parent);
    const realChild = fs.realpathSync(child);

    const relative = path.relative(realParent, realChild);

    return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
  } catch (err) {
    // Falls here if parent or child path does not physically exist
    return false;
  }
}

function getContentType(filePath) {
  const f = filePath.toLowerCase();
  if (f.endsWith('.js')) {
    return { 'Content-Type': 'text/javascript; charset=utf-8' };
  }
  if (f.endsWith('.png')) {
    return { 'Content-Type': 'image/png' };
  }
  if (f.endsWith('.jpg')) {
    return { 'Content-Type': 'image/jpeg' };
  }
  if (f.endsWith('.gif')) {
    return { 'Content-Type': 'image/gif' };
  }
  if (f.endsWith('.ico')) {
    return { 'Content-Type': 'image/x-icon' };
  }
  if (f.endsWith('.svg')) {
    return { 'Content-Type': 'image/svg+xml' };
  }
  if (f.endsWith('.jpg')) {
    return { 'Content-Type': 'image/jpeg' };
  }
  if (f.endsWith('.html')) {
    return { 'Content-Type': 'text/html; charset=utf-8' };
  }
  if (f.endsWith('.css')) {
    return { 'Content-Type': 'text/css' };
  }
  if (f.endsWith('.js')) {
    return { 'Content-Type': 'text/javascript; charset=utf-8' };
  }
  if (f.endsWith('.json') || f.endsWith('.tmj')) {
    return { 'Content-Type': 'application/json' };
  }
  // Can add more types here if needed - https://www.iana.org/assignments/media-types#audio
  console.log(`Unsupported media type: ${f}`);
  return undefined;
}
