// pages/api/heatmap-data.js

/**
 * This API route fetches your “Your_Points_Service” as GeoJSON and returns it.
 * We apply the same approach: server‐side fetch → forward JSON to client.
 */

export default async function handler(req, res) {
  const HEATMAP_URL =
    "https://rdmi05.maps.arcgis.com/arcgis/rest/services/Your_Points_Service/FeatureServer/0/query" +
    "?f=geojson&where=1%3D1&outFields=*";

  try {
    const arcRes = await fetch(HEATMAP_URL);
    if (!arcRes.ok) {
      return res
        .status(arcRes.status)
        .json({ error: `ArcGIS responded with ${arcRes.status}` });
    }
    const geojson = await arcRes.json();

    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(geojson);
  } catch (err) {
    console.error("Error fetching HeatmapService:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch heatmap data." });
  }
}
