// components/MapView.jsx
import React, { useEffect, useRef } from "react";
import esriConfig from "@arcgis/core/config";

export default function MapView({
  initialCenter = [-98.5795, 39.8283],
  initialZoom = 3
}) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    let view;

    // 1) Quiet down ArcGIS logging to avoid the repeated FBO warnings
    esriConfig.logLevel = "error";

    (async () => {
      // 2) Dynamically import only the ArcGIS classes needed for a MapView
      const [
        MapModule,
        MapViewModule
      ] = await Promise.all([
        import("@arcgis/core/Map").then((m) => m.default),
        import("@arcgis/core/views/MapView").then((m) => m.default)
      ]);

      // 3) Create the map and view
      const map = new MapModule({
        basemap: "streets-vector"
      });
      view = new MapViewModule({
        container: containerRef.current,
        map,
        center: initialCenter,
        zoom: initialZoom
      });
      viewRef.current = view;
    })();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  return (
    // This must fill 100% of its parent. The parent page sets 100vh.
    <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
  );
}
