// pages/map-view.jsx
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("../components/MapView"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "sans-serif"
      }}
    >
      <p>Loading map…</p>
    </div>
  )
});

export default function MapPage() {
  return (
    // 100vw x 100vh ensures the MapView's <div> (100%×100%) never collapses or stretches oddly
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapView initialCenter={[39.8283, -98.5795]} initialZoom={3} />
    </div>
  );
}
