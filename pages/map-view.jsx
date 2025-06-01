// pages/map-view.jsx
import dynamic from "next/dynamic";

const MapView = dynamic(
  () => import("../components/MapView"),
  {
    ssr: false,
    loading: () => (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
        <p>Loading map…</p>
      </div>
    )
  }
);

export default function MapPage() {
  return <MapView />;
}
