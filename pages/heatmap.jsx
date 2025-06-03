// pages/heatmap.jsx
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeatMapOverlay = dynamic(
  () => import("../components/HeatMapOverlay"),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontFamily: "sans-serif",
        }}
      >
        <p>Loading heatmap…</p>
      </div>
    ),
  }
);

export default function HeatmapPage() {
  const [geojson, setGeojson] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The ArcGIS FeatureServer for your points service:
    const HEATMAP_FEATURE_URL =
      "https://rdmi05.maps.arcgis.com/arcgis/rest/services/Your_Points_Service/FeatureServer/0";

    // Build the generic query-features URL:
    const apiUrl = `/api/query-features?url=${encodeURIComponent(
      HEATMAP_FEATURE_URL
    )}/query&where=1%3D1&outFields=*&f=geojson`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // The GeoJSON returned by query-features has a `features` array
        // We pass the entire GeoJSON object to our HeatMapOverlay
        setGeojson(data);
      })
      .catch((err) => {
        console.error("Error fetching heatmap GeoJSON:", err);
        setError(err.message);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {error ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            color: "red",
            fontFamily: "sans-serif",
          }}
        >
          <p>Error: {error}</p>
        </div>
      ) : geojson ? (
        <HeatMapOverlay
          geojson={geojson}
          basemap="topo-vector"
          center={[-98.5795, 39.8283]}
          zoom={5}
        />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontFamily: "sans-serif",
          }}
        >
          <p>Fetching heatmap data…</p>
        </div>
      )}
    </div>
  );
}
