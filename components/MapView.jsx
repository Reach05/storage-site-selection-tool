// components/MapView.jsx
import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

export default function MapViewComponent() {
  const container = useRef(null);

  useEffect(() => {
    const map = new Map({ basemap: "streets-vector" });

    const view = new MapView({
      container: container.current,
      map,
      zoom: 5,
      center: [-118.2437, 34.0522], // Los Angeles
    });

    return () => {
      view.destroy();
    };
  }, []);

  return <div ref={container} style={{ width: "100%", height: "100%" }} />;
}
