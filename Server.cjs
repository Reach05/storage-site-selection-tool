// server.cjs
import fs from "fs";
import https from "https";
import path from "path";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// respect PORT env var for flexibility
const PORT = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  const cert = fs.readFileSync(path.join(__dirname, "localhost+2.pem"));
  const key  = fs.readFileSync(path.join(__dirname, "localhost+2-key.pem"));

  const server = https.createServer({ cert, key }, (req, res) => handle(req, res));

  server
    .listen(PORT, () => {
      console.log(`🔒 HTTPS Dev Server listening on https://localhost:${PORT}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. ` +
          `Either free it or set a different port via the PORT env var.`
        );
        process.exit(1);
      }
      throw err;
    });
});
