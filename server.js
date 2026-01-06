const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? 'localhost' : '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

function existsDir(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isDirectory();
  } catch {
    return false;
  }
}

function existsFile(p) {
  try {
    return fs.existsSync(p) && fs.statSync(p).isFile();
  } catch {
    return false;
  }
}

// Hostinger'da çalışma dizini (cwd) bazen proje kökü olmayabiliyor.
// Bu yüzden proje kökünü otomatik bulup tüm yolları oradan çözüyoruz.
function findProjectRoot() {
  const candidates = [process.cwd(), __dirname];
  for (const start of candidates) {
    let cur = start;
    for (let i = 0; i < 6; i += 1) {
      const nextDir = path.join(cur, '.next');
      const staticDir = path.join(nextDir, 'static');
      const buildId = path.join(nextDir, 'BUILD_ID');
      const pkg = path.join(cur, 'package.json');
      if (existsDir(staticDir) && existsFile(buildId)) return cur;
      // Build henüz oluşmadıysa bile package.json bulunan dizini fallback al
      if (existsFile(pkg)) {
        // ama daha üstte .next varsa onu tercih et
        // (loop devam)
      }
      const parent = path.dirname(cur);
      if (parent === cur) break;
      cur = parent;
    }
  }
  // Son çare: server.js'in bulunduğu dizin
  return __dirname;
}

const appDir = findProjectRoot();
try {
  process.chdir(appDir);
} catch {
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
      // Tanılama: İstek Node'a geliyor mu?
      res.setHeader('X-App-Server', 'custom-next-server');

      // Sağlık / debug endpoint (opsiyonel güvenlik: DEBUG_TOKEN set değilse 404)
      if (pathname === '/__health') {
        const token = parsedUrl.query?.token;
        if (!process.env.DEBUG_TOKEN || token !== process.env.DEBUG_TOKEN) {
          res.statusCode = 404;
          res.end('Not found');
          return;
        }
        const info = {
          node: process.version,
          env: process.env.NODE_ENV || null,
          cwd: process.cwd(),
          appDir,
          port,
          buildId: buildId || null,
          staticDir,
          staticDirExists: existsDir(staticDir),
          staticSamples: [],
        };
        try {
          const chunksDir = path.join(staticDir, 'chunks');
          if (existsDir(chunksDir)) {
            info.staticSamples = fs.readdirSync(chunksDir).slice(0, 10);
          }
        } catch {
          // ignore
        }
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(JSON.stringify(info, null, 2));
        return;
      }
      
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
