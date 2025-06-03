// components/HeatMapOverlay.jsx
import React, { useEffect, useRef } from "react";
import esriConfig from "@arcgis/core/config";

export default function HeatMapOverlay({
  dataUrl,
  geojson, // newly added prop
  basemap = "topo-vector",
  center = [-98.5795, 39.8283],
  zoom = 5,
}) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    esriConfig.logLevel = "error";
    let view;

    (async () => {
      const [
        MapModule,
        MapViewModule,
        GeoJSONLayerModule,
        HeatmapRendererModule,
      ] = await Promise.all([
        import("@arcgis/core/Map").then((m) => m.default),
        import("@arcgis/core/views/MapView").then((m) => m.default),
        import("@arcgis/core/layers/GeoJSONLayer").then((m) => m.default),
        import("@arcgis/core/renderers/HeatmapRenderer").then((m) => m.default),
      ]);

      const map = new MapModule({ basemap });
      view = new MapViewModule({
        container: containerRef.current,
        map,
        center,
        zoom,
      });
      viewRef.current = view;

      // Define the heatmap renderer (adjust field name if necessary)
      const heatmapRenderer = new HeatmapRendererModule({
        field: "value",
        colorStops: [
          { ratio: 0, color: "rgba(63,40,102,0)" },
          { ratio: 0.2, color: "rgba(65,182,196,0.5)" },
          { ratio: 0.4, color: "rgba(127,205,187,0.5)" },
          { ratio: 0.6, color: "rgba(199,234,229,0.5)" },
          { ratio: 0.8, color: "rgba(237,248,177,0.5)" },
          { ratio: 1, color: "rgba(255,255,217,0.5)" },
        ],
        radius: 30,
      });

      let heatmapLayer;
      if (geojson) {
        // Use in-memory GeoJSON source
        heatmapLayer = new GeoJSONLayerModule({
          source: geojson,
          renderer: heatmapRenderer,
          popupTemplate: {
            title: "{name}",
            content: "{value}",
          },
        });
      } else {
        // Fallback to URL if no geojson passed
        heatmapLayer = new GeoJSONLayerModule({
          url: dataUrl,
          renderer: heatmapRenderer,
          popupTemplate: {
            title: "{name}",
            content: "{value}",
          },
        });
      }

      map.add(heatmapLayer);
    })();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [dataUrl, geojson, basemap, center, zoom]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
