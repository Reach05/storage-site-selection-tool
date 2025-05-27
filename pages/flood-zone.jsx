// pages/flood-zone.jsx
import dynamic from "next/dynamic";

// Load the FloodZoneOverlay only on the client
const FloodZoneOverlay = dynamic(
  () => import("../components/FloodZoneOverlay"),
  { ssr: false }
);

export default function FloodZonePage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <FloodZoneOverlay serviceUrl="https://your-fema-service/MapServer" />
    </div>
  );
}
