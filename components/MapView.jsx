// components/MapView.jsx
import React, { useRef, useEffect } from "react";
import Map from "@arcgis/core/Map";
import MapViewClass from "@arcgis/core/views/MapView";

export default function MapView({ initialCenter, initialZoom, style = {} }) {
  const containerRef = useRef(null);
  const viewRef = useRef(null);

  useEffect(() => {
    if (viewRef.current || !containerRef.current) return;

    viewRef.current = new MapViewClass({
      container: containerRef.current,
      map: new Map({ basemap: "streets" }),
      center: initialCenter,
      zoom: initialZoom,
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [initialCenter, initialZoom]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
}
