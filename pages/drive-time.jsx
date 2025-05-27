// pages/drive-time.jsx
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// load client-only
const DriveTimePolygons = dynamic(
  () => import("../components/DriveTimePolygons"),
  { ssr: false }
);

export default function DriveTimePage() {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    // Replace this with your real service or data-fetch
    fetch("/api/drive-time-isochrones") 
      .then((res) => res.json())
      .then((data) => {
        // Expect data.features = [{ geometry: { coordinates: […] }, properties: {…} }, …]
        setPolygons(data.features);
      })
      .catch(console.error);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {polygons.length > 0 ? (
        <DriveTimePolygons polygons={polygons} />
      ) : (
        <p style={{ padding: 20 }}>Loading drive-time polygons…</p>
      )}
    </div>
  );
}
