// scripts/copy-arcgis-assets.js
import fs from "fs-extra";
import path from "path";

(async () => {
  // 1) Determine paths
  const projectRoot = process.cwd();
  const source      = path.join(projectRoot, "node_modules", "@arcgis", "core", "assets");
  const dest        = path.join(projectRoot, "public",  "arcgis",     "assets");

  console.log("ℹ️  Copying ArcGIS assets from:");
  console.log("   ", source);
  console.log("→  to", dest);

  try {
    // 2) Delete any existing copy
    await fs.remove(dest);

    // 3) Copy everything except .scss/Sass source files
    await fs.copy(source, dest, {
      filter: (src) => {
        // skip any SCSS or Sass files
        if (src.endsWith(".scss") || src.endsWith(".sass")) {
          return false;
        }
        // otherwise include
        return true;
      }
    });

    console.log("✅ ArcGIS assets copied (SCSS excluded)");
  } catch (err) {
    console.error("❌ Failed to copy ArcGIS assets:", err);
    process.exit(1);
  }
})();
