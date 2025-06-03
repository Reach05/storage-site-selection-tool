// pages/drive-time.jsx
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const DriveTimePolygons = dynamic(
  () => import("../components/DriveTimePolygons"),
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
        <p>Loading drive‐time data…</p>
      </div>
    ),
  }
);

export default function DriveTimePage() {
  const [features, setFeatures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // The actual ArcGIS FeatureServer URL:
    const DRIVE_TIME_FEATURE_URL =
      "https://rdmi05.maps.arcgis.com/arcgis/rest/services/DriveTimeService/FeatureServer/0";

    // Build the query‐features endpoint call:
    const apiUrl = `/api/query-features?url=${encodeURIComponent(
      DRIVE_TIME_FEATURE_URL
    )}/query&where=1%3D1&outFields=*&f=geojson`;

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Server responded ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        // data.features is an array of GeoJSON features
        setFeatures(data.features || []);
      })
      .catch((err) => {
        console.error("Error fetching drive‐time features:", err);
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
      ) : features.length > 0 ? (
        <DriveTimePolygons
          polygons={features}
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
          <p>Fetching drive‐time polygons…</p>
        </div>
      )}
    </div>
  );
}
