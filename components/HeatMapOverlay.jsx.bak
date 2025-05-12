import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function HeatMapOverlay({ populationUrl, incomeUrl }) {
  const viewRef = useRef();

  useEffect(() => {
    (async () => {
      const [FeatureLayer] = await loadModules(["esri/layers/FeatureLayer"]);
      const popLayer = new FeatureLayer({ url: populationUrl });
      const incLayer = new FeatureLayer({ url: incomeUrl });
      viewRef.current.map.addMany([popLayer, incLayer]);
    })();
  }, [populationUrl, incomeUrl]);

  return <div ref={viewRef} style={{ width: "100%", height: "100%" }} />;
}
