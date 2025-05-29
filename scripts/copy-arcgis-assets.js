// scripts/copy-arcgis-assets.js
import fs from "fs-extra";
import path from "path";

async function main() {
  const src = path.resolve("node_modules/@arcgis/core/assets");
  const dest = path.resolve("public/arcgis/assets");

  try {
    // ensure dest dir exists, then recursively copy
    await fs.copy(src, dest, { overwrite: true });
    console.log("✅ ArcGIS assets copied to public/arcgis/assets");
  } catch (err) {
    console.error("❌ Failed to copy ArcGIS assets:", err);
    process.exit(1);
  }
}

main();
