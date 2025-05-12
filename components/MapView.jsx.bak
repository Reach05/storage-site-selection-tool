import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function MapView() {
  const mapRef = useRef();

  useEffect(() => {
    (async () => {
      const [Map, MapView] = await loadModules([
        "esri/Map",
        "esri/views/MapView"
      ]);
      const map = new Map({ basemap: "streets" });
      const view = new MapView({
        container: mapRef.current,
        map,
        center: [-98.57, 39.83],
        zoom: 5
      });
    })();
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
}
