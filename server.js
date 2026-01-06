const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);
// Hostinger'da çalışma dizini (cwd) bazen proje kökü olmayabiliyor.
// Bu yüzden tüm yolları __dirname (server.js'in bulunduğu klasör) üzerinden çözüyoruz.
const appDir = __dirname;
try {
  process.chdir(appDir);
} catch (e) {
  // ignore
}

const app = next({ 
  dev,
  hostname,
  port,
  dir: appDir,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('> Next.js app prepared successfully');
  console.log(`> cwd: ${process.cwd()}`);
  console.log(`> appDir: ${appDir}`);
  
  const staticDir = path.join(appDir, '.next', 'static');
  const buildIdFile = path.join(appDir, '.next', 'BUILD_ID');
  
  let buildId = null;
  if (fs.existsSync(buildIdFile)) {
    buildId = fs.readFileSync(buildIdFile, 'utf8').trim();
    console.log(`> Build ID: ${buildId}`);
  }
  
  if (fs.existsSync(staticDir)) {
    console.log('> ✓ .next/static directory exists');
  } else {
    console.error('> ✗ ERROR: .next/static directory not found!');
    console.error(`> Expected staticDir: ${staticDir}`);
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
          // Build ID olmadan da dene
          fullPath = path.join(staticDir, pathAfterStatic);
        }
        
        // Dosya var mı kontrol et
        if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
          console.log(`> Serving static file: ${pathname} -> ${fullPath}`);
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
        } else {
          // Dosya bulunamadı - logla
          console.error(`> Static file NOT found: ${fullPath}`);
          console.error(`> Requested path: ${pathname}`);
          console.error(`> Build ID: ${buildId}`);
          console.error(`> Static dir: ${staticDir}`);
          
          // Static dir içeriğini listele (debug için)
          if (fs.existsSync(staticDir)) {
            try {
              const staticContents = fs.readdirSync(staticDir);
              console.error(`> Static dir contents: ${staticContents.join(', ')}`);
            } catch (e) {
              console.error(`> Could not read static dir: ${e.message}`);
            }
          }
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
