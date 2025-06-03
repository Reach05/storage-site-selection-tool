// pages/flood-zone.jsx
import dynamic from "next/dynamic";

const FloodZoneOverlay = dynamic(
  () => import("../components/FloodZoneOverlay"),
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
        <p>Loading flood‐zone layer…</p>
      </div>
    ),
  }
);

export default function FloodZonePage() {
  // This is the Living Atlas Flood Hazard Areas ImageServer endpoint:
  const FLOODZONE_IMAGE_SERVICE_URL =
    "https://landscape11.arcgis.com/arcgis/rest/services/USA_Flood_Hazard_Areas/ImageServer";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FloodZoneOverlay
        serviceUrl={FLOODZONE_IMAGE_SERVICE_URL}
        basemap="topo-vector"
        center={[-98.5795, 39.8283]}
        zoom={5}
      />
    </div>
  );
}
