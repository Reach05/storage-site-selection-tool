// pages/flood-zone.jsx
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const MapViewComponent = dynamic(() => import("../components/MapView"), {
  ssr: false
});

export default function FloodZonePage() {
  // We will use the Living Atlas ImageServer for flood hazard areas
  const floodLayerUrl =
    "https://landscape11.arcgis.com/arcgis/rest/services/USA_Flood_Hazard_Areas/ImageServer";

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MapViewComponent
        initialCenter={[39.8283, -98.5795]}
        initialZoom={4}
        basemap="topo-vector"
        floodLayerUrl={floodLayerUrl}
      />
    </div>
  );
}
