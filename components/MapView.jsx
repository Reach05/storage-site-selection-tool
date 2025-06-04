import React, { useEffect, useRef, useState } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import HeatMapOverlay from "./HeatMapOverlay";
import FloodZoneOverlay from "./FloodZoneOverlay";
import DriveTimePolygons from "./DriveTimePolygons";
import LegendPanel from "./LegendPanel";

export default function ArcGISMapView() {
  const mapRef = useRef(null);
  const [view, setView] = useState(null);

  const [showHeatMap, setShowHeatMap] = useState(true);
  const [showFloodZones, setShowFloodZones] = useState(true);
  const [showDriveTime, setShowDriveTime] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (!mapRef.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("heatmap")) setShowHeatMap(urlParams.get("heatmap") === "true");
    if (urlParams.has("flood")) setShowFloodZones(urlParams.get("flood") === "true");
    if (urlParams.has("drive")) setShowDriveTime(urlParams.get("drive") === "true");

    let map;
    try {
      map = new Map({ basemap: "topo-vector" });
    } catch (e) {
      console.warn("Basemap load failed", e);
      map = new Map({ basemap: "osm" });
    }

    const viewInstance = new MapView({
      container: mapRef.current,
      map: map,
      center: [-98.58, 39.83],
      zoom: 5
    });

    viewInstance.when(() => {
      if (isMounted) setView(viewInstance);
    });

    return () => {
      isMounted = false;
      viewInstance?.destroy();
    };
  }, []);

  const updateURLParams = (key, value) => {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  };

  const flyToOverlay = (type) => {
    if (!view) return;
    let target;
    switch (type) {
      case "heatmap":
        target = { center: [-98.58, 39.83], zoom: 6 };
        break;
      case "flood":
        target = { center: [-90, 30], zoom: 7 };
        break;
      case "drive":
        target = { center: [-97, 32.8], zoom: 10 };
        break;
    }
    if (target) {
      view.goTo(target).catch((err) => console.warn("Fly-to failed", err));
    }
  };

  const handleOverlayToggle = (type, current) => {
    const next = !current;
    switch (type) {
      case "heatmap":
        setShowHeatMap(next);
        break;
      case "flood":
        setShowFloodZones(next);
        break;
      case "drive":
        setShowDriveTime(next);
        break;
      default:
        break;
    }
    updateURLParams(type, next);
    if (next) flyToOverlay(type);
  };

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }}></div>

      {view && (
        <>
          {showHeatMap && <HeatMapOverlay view={view} />}
          {showFloodZones && <FloodZoneOverlay view={view} />}
          {showDriveTime && <DriveTimePolygons view={view} />}
        </>
      )}

      <LegendPanel
        showHeatMap={showHeatMap}
        showFloodZones={showFloodZones}
        showDriveTime={showDriveTime}
      />

      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          background: "white",
          padding: "1rem",
          borderRadius: "8px",
          boxShadow: "0 0 6px rgba(0,0,0,0.2)",
          zIndex: 999,
          minWidth: "200px"
        }}
      >
        <strong>Overlay Controls</strong>
        <hr />
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label>
            <input
              type="checkbox"
              checked={showHeatMap}
              onChange={() => handleOverlayToggle("heatmap", showHeatMap)}
            /> Heat Map
          </label>

          <label>
            <input
              type="checkbox"
              checked={showFloodZones}
              onChange={() => handleOverlayToggle("flood", showFloodZones)}
            /> Flood Zones
          </label>

          <label>
            <input
              type="checkbox"
              checked={showDriveTime}
              onChange={() => handleOverlayToggle("drive", showDriveTime)}
            /> Drive Time
          </label>
        </div>
      </div>
    </div>
  );
}
