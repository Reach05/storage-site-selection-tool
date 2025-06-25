// copy-assets.js
import fs from "fs-extra";
import path from "path";

async function copyArcGISAssets() {
  // 1. figure out where we are
  const projectRoot = process.cwd();
  console.log("Project root:", projectRoot);

  // 2. source & destination
  const source = path.join(projectRoot, "node_modules", "@arcgis", "core", "assets");
  const dest   = path.join(projectRoot, "public", "arcgis", "assets");

  console.log("Copying ArcGIS assets from:");
  console.log("  →", source);
  console.log("to:");
  console.log("  →", dest);

  // 3. remove old + copy new
  await fs.remove(dest);
  await fs.copy(source, dest);

  console.log("✅ ArcGIS assets copied to public/arcgis/assets");
}

copyArcGISAssets().catch((err) => {
  console.error("❌ Failed to copy ArcGIS assets:", err);
  process.exit(1);
});
