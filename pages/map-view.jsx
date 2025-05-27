// pages/map-view.jsx
import dynamic from "next/dynamic";

// disable server-side rendering for the ArcGIS-heavy component
const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapView />
    </div>
  );
}
