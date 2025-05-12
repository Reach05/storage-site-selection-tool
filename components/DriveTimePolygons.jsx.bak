import { useEffect, useRef } from "react";
import { loadModules } from "esri-loader";

export default function DriveTimePolygons({ serviceUrl }) {
  const viewRef = useRef();

  useEffect(() => {
    (async () => {
      const [FeatureLayer] = await loadModules(["esri/layers/FeatureLayer"]);
      const fl = new FeatureLayer({ url: serviceUrl });
      fl.load().then(() => {
        viewRef.current.map.add(fl);
      });
    })();
  }, [serviceUrl]);

  return <div ref={viewRef} style={{ width: "100%", height: "100%" }} />;
}
