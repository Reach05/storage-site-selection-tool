// components/FloodZoneOverlay.jsx
import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";

export default function FloodZoneOverlay({
  serviceUrl,                  // REST endpoint of your flood-zone Map Service
  basemap = "topo-vector",
  center = [-118.2437, 34.0522],
  zoom = 10
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Create map & view
    const map = new Map({ basemap });
    const view = new MapView({
      container: containerRef.current,
      map,
      center,
      zoom,
    });

    // 2. Add flood-zone layer
    const floodLayer = new MapImageLayer({
      url: serviceUrl,
      // you can further configure sublayers, opacity, etc.
      opacity: 0.6
    });

    map.add(floodLayer);

    // 3. Cleanup
    return () => {
      view.destroy();
    };
  }, [serviceUrl, basemap, center, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
