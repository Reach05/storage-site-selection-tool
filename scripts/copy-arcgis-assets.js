// scripts/copy-arcgis-assets.js
import fs from "fs-extra";
import path from "path";

(async () => {
  const projectRoot = process.cwd();
  const source      = path.join(projectRoot, "node_modules", "@arcgis", "core", "assets");
  const dest        = path.join(projectRoot, "public",  "arcgis",     "assets");

  console.log("ℹ️  Copying ArcGIS assets from:", source);
  console.log("→  to", dest);

  try {
    // wipe old assets
    await fs.remove(dest);

    // copy everything *except* Sass source
    await fs.copy(source, dest, {
      filter: (src) => !(/\.(scss|sass)$/i).test(src)
    });

    console.log("✅ ArcGIS assets copied (SCSS/SASS excluded)");
  } catch (err) {
    console.error("❌ Failed to copy ArcGIS assets:", err);
    process.exit(1);
  }
})();
