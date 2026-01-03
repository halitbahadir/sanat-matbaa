const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ 
  dev,
  hostname,
  port,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('> Next.js app prepared successfully');
  
  const staticDir = path.join(process.cwd(), '.next', 'static');
  const buildIdFile = path.join(process.cwd(), '.next', 'BUILD_ID');
  
  let buildId = null;
  if (fs.existsSync(buildIdFile)) {
    buildId = fs.readFileSync(buildIdFile, 'utf8').trim();
    console.log(`> Build ID: ${buildId}`);
  }
  
  if (fs.existsSync(staticDir)) {
    console.log('> ✓ .next/static directory exists');
  } else {
    console.error('> ✗ ERROR: .next/static directory not found!');
  }
  
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const pathname = parsedUrl.pathname || '';
      
      // _next/static dosyaları için doğrudan serve et
      if (pathname.startsWith('/_next/static/')) {
        const pathAfterStatic = pathname.replace('/_next/static/', '');
        const pathParts = pathAfterStatic.split('/');
        
        let fullPath;
        
        // Build ID ile path kontrolü
        if (buildId && pathParts[0] === buildId) {
          fullPath = path.join(staticDir, buildId, pathParts.slice(1).join('/'));
        } else {
          fullPath = path.join(staticDir, pathAfterStatic);
        }
        
        // Dosya var mı kontrol et
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
          // Content-Type belirle
          let contentType = 'application/octet-stream';
          if (fullPath.endsWith('.js')) {
            contentType = 'application/javascript; charset=utf-8';
          } else if (fullPath.endsWith('.css')) {
            contentType = 'text/css; charset=utf-8';
          } else if (fullPath.endsWith('.woff2')) {
            contentType = 'font/woff2';
          } else if (fullPath.endsWith('.woff')) {
            contentType = 'font/woff';
          } else if (fullPath.endsWith('.ttf')) {
            contentType = 'font/ttf';
          } else if (fullPath.endsWith('.eot')) {
            contentType = 'application/vnd.ms-fontobject';
          } else if (fullPath.endsWith('.svg')) {
            contentType = 'image/svg+xml';
          }
          
          // Cache headers
          res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
          res.setHeader('Content-Type', contentType);
          
          // Dosyayı oku ve gönder
          const fileContent = fs.readFileSync(fullPath);
          res.setHeader('Content-Length', fileContent.length);
          res.writeHead(200);
          res.end(fileContent);
          return;
        }
      }
      
      // Diğer istekleri Next.js handler'a yönlendir
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch((err) => {
  console.error('Failed to prepare Next.js app:', err);
  process.exit(1);
});
