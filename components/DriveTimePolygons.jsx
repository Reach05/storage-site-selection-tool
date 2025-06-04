// components/DriveTimePolygons.jsx
import { useEffect } from "react";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";

export default function DriveTimePolygons({ view }) {
  useEffect(() => {
    if (!view) return;

    try {
      const layer = new GraphicsLayer();
      view.map.add(layer);

      const polygon = {
        type: "polygon",
        rings: [
          [-118.25, 34.05],
          [-118.20, 34.05],
          [-118.20, 34.10],
          [-118.25, 34.10],
          [-118.25, 34.05],
        ],
        spatialReference: { wkid: 4326 },
      };

      const graphic = new Graphic({
        geometry: polygon,
        symbol: {
          type: "simple-fill",
          color: [255, 0, 0, 0.3],
          outline: { color: [255, 0, 0], width: 1 },
        },
      });

      layer.add(graphic);
    } catch (err) {
      console.error("DriveTimePolygons failed to render:", err);
    }

    return () => {
      try {
        const layerToRemove = view.map.allLayers.find(
          (l) => l.title === "Drive Time"
        );
        if (layerToRemove) view.map.remove(layerToRemove);
      } catch (_) {}
    };
  }, [view]);

  return null;
}
