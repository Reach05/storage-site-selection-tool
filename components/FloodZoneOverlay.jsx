// components/FloodZoneOverlay.jsx
import React, { useEffect, useRef } from "react";

export default function FloodZoneOverlay({
  serviceUrl,                    // REST endpoint of your flood‐zone Map Service
  basemap = "topo-vector",
  center = [-98.5795, 39.8283],
  zoom = 5
}) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    let view;

    (async () => {
      // 1) Dynamically load only what we need
      const [
        MapModule,
        MapViewModule,
        MapImageLayerModule
      ] = await Promise.all([
        import("@arcgis/core/Map").then((m) => m.default),
        import("@arcgis/core/views/MapView").then((m) => m.default),
        import("@arcgis/core/layers/MapImageLayer").then((m) => m.default),
      ]);

      // 2) Create map & view
      const map = new MapModule({ basemap });
      view = new MapViewModule({
        container: containerRef.current,
        map,
        center,
        zoom,
      });
      viewRef.current = view;

      // 3) Add the FEMA/ArcGIS MapService as a MapImageLayer
      const floodLayer = new MapImageLayerModule({
        url: serviceUrl,
        opacity: 0.6
      });
      map.add(floodLayer);
    })();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [serviceUrl, basemap, center, zoom]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
