// pages/drive-time.jsx
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const MapViewComponent = dynamic(
  () => import("../components/MapView"),
  { ssr: false }
);

export default function DriveTimePage() {
  const [polygons, setPolygons] = useState(null);

  useEffect(() => {
    // 1) If your REST service supports CORS, you can fetch directly; otherwise proxy it
    const url =
      "https://rdmi05.maps.arcgis.com/arcgis/rest/services/DriveTimeService/FeatureServer/0/query?f=geojson&where=1=1&outFields=*";

    fetch(url)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Server responded ${r.status}`);
        }
        return r.json();
      })
      .then((geojson) => {
        setPolygons(geojson);
      })
      .catch((err) => {
        console.error("Error fetching drive‐time GeoJSON:", err);
      });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapViewComponent
        initialCenter={[39.8283, -98.5795]}
        initialZoom={3}
        basemap="streets"
        // If MapViewComponent accepted an overlay prop, pass polygons here.
        // For example: <MapViewComponent overlays={{ driveTime: polygons }} />
      />
      {/* In MapViewComponent, you could watch for `polygons` prop and add a 
          GeoJSONLayer or Graphics for those features onto the view. */}
    </div>
  );
}
