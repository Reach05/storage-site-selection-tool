// components/HeatMapOverlay.jsx
import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";

export default function HeatMapOverlay({
  dataUrl,                     // URL to your GeoJSON data
  basemap = "topo-vector",
  center = [-118.2437, 34.0522],
  zoom = 10
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Create map & view
    const map = new Map({ basemap });
    const view = new MapView({
      container: containerRef.current,
      map,
      center,
      zoom,
    });

    // 2. Add heatmap layer
    const heatmapLayer = new GeoJSONLayer({
      url: dataUrl,
      renderer: new HeatmapRenderer({
        // adjust field or remove if you want uniform weighting
        field: "value",  
        colorStops: [
          { ratio: 0, color: "rgba(63,40,102,0)" },
          { ratio: 0.2, color: "rgba(65,182,196,0.5)" },
          { ratio: 0.4, color: "rgba(127,205,187,0.5)" },
          { ratio: 0.6, color: "rgba(199,234,229,0.5)" },
          { ratio: 0.8, color: "rgba(237,248,177,0.5)" },
          { ratio: 1, color: "rgba(255,255,217,0.5)" },
        ],
        radius: 30
      }),
      // optional: customize popups
      popupTemplate: {
        title: "{name}",
        content: "{value}"
      }
    });

    map.add(heatmapLayer);

    // 3. Cleanup
    return () => {
      view.destroy();
    };
  }, [dataUrl, basemap, center, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
