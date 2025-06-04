// scripts/copy-arcgis-assets.js
import fs from "fs-extra";
import path from "path";

(async () => {
  // Make sure we’re running from the project root (where package.json lives):
  const projectRoot = process.cwd();
  console.log("  Project root is:", projectRoot);

  // Source: <projectRoot>/node_modules/@arcgis/core/assets
  const source = path.join(projectRoot, "node_modules", "@arcgis", "core", "assets");

  // Destination: <projectRoot>/public/arcgis/assets
  const dest = path.join(projectRoot, "public", "arcgis", "assets");

  console.log("  Copying ArcGIS assets from:");
  console.log("     ", source);
  console.log("     → to ", dest);

  try {
    // 1) Remove any old copy
    await fs.remove(dest);

    // 2) Copy the entire @arcgis/core/assets folder
    await fs.copy(source, dest);

    console.log("✅ ArcGIS assets copied to public/arcgis/assets");
  } catch (err) {
    console.error("❌ Failed to copy ArcGIS assets:", err);
    process.exit(1);
  }
})();
