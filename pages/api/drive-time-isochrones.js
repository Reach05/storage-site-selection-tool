// pages/api/drive-time-isochrones.js

/**
 * This API route fetches the DriveTimeService as GeoJSON and returns it.
 * Because the ArcGIS endpoint lacks CORS headers, we fetch server-side
 * and then forward the JSON to the client.
 */

export default async function handler(req, res) {
  const DRIVE_TIME_URL =
    "https://rdmi05.maps.arcgis.com/arcgis/rest/services/DriveTimeService/FeatureServer/0/query" +
    "?f=geojson&where=1%3D1&outFields=*";

  try {
    const arcRes = await fetch(DRIVE_TIME_URL);
    if (!arcRes.ok) {
      return res
        .status(arcRes.status)
        .json({ error: `ArcGIS responded with ${arcRes.status}` });
    }
    const geojson = await arcRes.json();

    // Forward the GeoJSON exactly as‐is
    res.setHeader("Content-Type", "application/json");
    return res.status(200).json(geojson);
  } catch (err) {
    console.error("Error fetching DriveTimeService:", err);
    return res
      .status(500)
      .json({ error: "Failed to fetch DriveTimeService data." });
  }
}
