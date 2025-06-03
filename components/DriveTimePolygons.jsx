// components/DriveTimePolygons.jsx
import React, { useEffect, useRef } from "react";

export default function DriveTimePolygons({
  polygons = [],                 // Array of GeoJSON‐style features
  basemap = "topo-vector",
  center = [-98.5795, 39.8283],
  zoom = 5
}) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    let view;

    (async () => {
      // 1) Dynamically load the ArcGIS classes needed
      const [
        MapModule,
        MapViewModule,
        GraphicsLayerModule,
        GraphicModule,
        PolygonModule,
        SimpleFillSymbolModule,
      ] = await Promise.all([
        import("@arcgis/core/Map").then((m) => m.default),
        import("@arcgis/core/views/MapView").then((m) => m.default),
        import("@arcgis/core/layers/GraphicsLayer").then((m) => m.default),
        import("@arcgis/core/Graphic").then((m) => m.default),
        import("@arcgis/core/geometry/Polygon").then((m) => m.default),
        import("@arcgis/core/symbols/SimpleFillSymbol").then((m) => m.default),
      ]);

      // 2) Create map & view
      const map = new MapModule({ basemap });
      view = new MapViewModule({
        container: containerRef.current,
        map,
        center,
        zoom,
      });
      viewRef.current = view;

      // 3) Add a GraphicsLayer for polygons
      const graphicsLayer = new GraphicsLayerModule();
      map.add(graphicsLayer);

      // 4) For each feature, create a Graphic
      polygons.forEach((feature) => {
        const { coordinates } = feature.geometry;
        const polygonGeom = new PolygonModule({
          rings: coordinates,
          spatialReference: { wkid: 4326 },
        });

        const fillSymbol = new SimpleFillSymbolModule({
          color: [51, 92, 160, 0.4],
          outline: { color: [51, 92, 160], width: 2 },
        });

        const graphic = new GraphicModule({
          geometry: polygonGeom,
          symbol: fillSymbol,
          attributes: feature.properties || {},
        });

        graphicsLayer.add(graphic);
      });
    })();

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [polygons, basemap, center, zoom]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
