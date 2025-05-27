// pages/heatmap.jsx
import dynamic from "next/dynamic";

// Load the HeatMapOverlay only on the client
const HeatMapOverlay = dynamic(
  () => import("../components/HeatMapOverlay"),
  { ssr: false }
);

export default function HeatmapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <HeatMapOverlay dataUrl="/path/to/your/data.geojson" />
    </div>
  );
}
