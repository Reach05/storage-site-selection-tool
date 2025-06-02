// components/MapView.jsx
import { useEffect, useRef } from "react";

export default function MapView({ initialCenter = [39.83, -98.5795], initialZoom = 10 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let view;
    let map;
    // Only import @arcgis/core in the browser
    (async () => {
      const [Map, MapView] = await Promise.all([
        import("@arcgis/core/Map").then((m) => m.default),
        import("@arcgis/core/views/MapView").then((m) => m.default),
      ]);

      map = new Map({ basemap: "streets-vector" });
      view = new MapView({
        container: containerRef.current,
        map,
        center: initialCenter,
        zoom: initialZoom,
      });
    })();

    return () => {
      if (view) view.destroy();
    };
  }, [initialCenter, initialZoom]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
