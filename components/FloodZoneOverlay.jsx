// components/FloodZoneOverlay.jsx
import { useEffect } from "react";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";

export default function FloodZoneOverlay({ view }) {
  useEffect(() => {
    if (!view) return;

    const layer = new GeoJSONLayer({
      url: "/data/floodzones.geojson", // Must be in /public/data/
      title: "Flood Zones",
      opacity: 0.5,
    });

    view.map.add(layer).catch((err) => {
      console.error("FloodZoneOverlay failed to load:", err);
    });

    return () => {
      view.map.remove(layer).catch(() => {});
    };
  }, [view]);

  return null;
}
