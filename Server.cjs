// server.cjs
const fs    = require("fs");
const https = require("https");
const path  = require("path");
const next  = require("next");

const app    = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const cert = fs.readFileSync(path.join(__dirname, "localhost+2.pem"));
  const key  = fs.readFileSync(path.join(__dirname, "localhost+2-key.pem"));

  https
    .createServer({ cert, key }, (req, res) => handle(req, res))
    .listen(3000, () => {
      console.log("🚀 HTTPS Dev Server listening on https://localhost:3000");
    });
});
