// pages/api/query-features.js
import { queryFeatures } from "@esri/arcgis-rest-feature-service";

export default async function handler(req, res) {
  const { url, where = "1=1", outFields = "*", f = "geojson" } = req.query;

  if (!url) {
    return res
      .status(400)
      .json({ error: "Missing required `url` query parameter" });
  }

  try {
    // queryFeatures returns a GeoJSON‐like structure when f="geojson"
    const result = await queryFeatures({
      url,
      where,
      outFields: outFields.split(","),
      f,
    });
    return res.status(200).json(result);
  } catch (e) {
    console.error("query-features error:", e);
    return res.status(500).json({ error: e.message });
  }
}
