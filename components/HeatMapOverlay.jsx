// components/HeatMapOverlay.jsx
import { useEffect } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export default function HeatMapOverlay({ view }) {
  useEffect(() => {
    if (!view) return;

    const layer = new FeatureLayer({
      url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/LA_Trees/FeatureServer/0", // Replace if needed
      renderer: {
        type: "heatmap",
        colorStops: [
          { ratio: 0, color: "rgba(255,255,255,0)" },
          { ratio: 0.2, color: "blue" },
          { ratio: 0.5, color: "yellow" },
          { ratio: 0.9, color: "red" },
        ],
        maxPixelIntensity: 100,
        minPixelIntensity: 0,
      },
    });

    view.map.add(layer).catch((err) => {
      console.error("HeatMapOverlay failed to load:", err);
    });

    return () => {
      view.map.remove(layer).catch(() => {});
    };
  }, [view]);

  return null;
}
