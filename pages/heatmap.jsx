// pages/heatmap.jsx
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const MapViewComponent = dynamic(() => import("../components/MapView"), {
  ssr: false
});

export default function HeatmapPage() {
  const [heatFeatures, setHeatFeatures] = useState(null);

  useEffect(() => {
    const url =
      "https://rdmi05.maps.arcgis.com/arcgis/rest/services/Your_Points_Service/FeatureServer/0/query?f=geojson&where=1=1&outFields=*";

    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Server responded ${r.status}`);
        }
        return r.json();
      })
      .then((geojson) => {
        setHeatFeatures(geojson);
      })
      .catch((err) => {
        console.error("Error fetching heatmap GeoJSON:", err);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapViewComponent
        initialCenter={[39.8283, -98.5795]}
        initialZoom={4}
        basemap="gray-vector"
        // Later, inside MapViewComponent you could add a HeatmapRenderer layer
        // pointing to `heatFeatures` (GeoJSONLayer or GraphicsLayer + renderer).
      />
    </div>
  );
}
