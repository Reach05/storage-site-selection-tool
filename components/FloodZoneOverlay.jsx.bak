import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function FloodZoneOverlay({ kmlUrl }) {
  const viewRef = useRef();

  useEffect(() => {
    (async () => {
      const [KMLLayer] = await loadModules(["esri/layers/KMLLayer"]);
      const layer = new KMLLayer({ url: kmlUrl });
      await layer.load();
      viewRef.current.map.add(layer);
    })();
  }, [kmlUrl]);

  return <div ref={viewRef} style={{ width: "100%", height: "100%" }} />;
}
