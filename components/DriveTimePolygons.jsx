// components/DriveTimePolygons.jsx
import { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";

export default function DriveTimePolygons({
  polygons,                // Array of features: { geometry: { coordinates: […] }, properties: { … } }
  basemap = "topo-vector",
  center = [-118.2437, 34.0522],
  zoom = 12
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1) Create the map and view
    const map = new Map({ basemap });
    const view = new MapView({
      container: containerRef.current,
      map,
      center,
      zoom,
    });

    // 2) Add a graphics layer for your drive-time polygons
    const graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);

    // 3) Turn each feature into an ArcGIS Graphic
    polygons.forEach((feature) => {
      const { coordinates } = feature.geometry; 
      // assume coordinates is an array of rings: [[ [lon, lat], … ], …]
      const polygonGeom = new Polygon({
        rings: coordinates,
        spatialReference: { wkid: 4326 }
      });

      const fillSymbol = new SimpleFillSymbol({
        color: [51, 92, 160, 0.4],
        outline: { color: [51, 92, 160], width: 2 }
      });

      const graphic = new Graphic({
        geometry: polygonGeom,
        symbol: fillSymbol,
        attributes: feature.properties
      });

      graphicsLayer.add(graphic);
    });

    // 4) Cleanup on unmount
    return () => {
      view.destroy();
    };
  }, [polygons, basemap, center, zoom]);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100%", position: "relative" }}
    />
  );
}
