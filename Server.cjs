// server.cjs
const fs = require("fs");
const https = require("https");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// Allow overriding the port via the PORT env var
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  // Load your mkcert‐generated certs
  const certPath = path.join(__dirname, "localhost+2.pem");
  const keyPath = path.join(__dirname, "localhost+2-key.pem");

  const cert = fs.readFileSync(certPath);
  const key = fs.readFileSync(keyPath);

  const server = https.createServer({ cert, key }, (req, res) => {
    return handle(req, res);
  });

  server
    .listen(PORT, () => {
      console.log(`🔒 HTTPS Dev Server listening on https://localhost:${PORT}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Free it or set a different PORT env var.`
        );
        process.exit(1);
      }
      throw err;
    });
});
