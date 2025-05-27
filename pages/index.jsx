import React, { useState } from 'react';
import MapView from '../components/MapView';
import DriveTimePolygons from '../components/DriveTimePolygons';
import HeatMapOverlay from '../components/HeatMapOverlay';
import FloodZoneOverlay from '../components/FloodZoneOverlay';

export default function Home() {
  // assume MapView provides `view` via context or render‐prop
  const [view, setView] = useState(null);

  return (
    <MapView onViewCreated={setView}>
      {view && (
        <>
          <DriveTimePolygons
            view={view}
            serviceUrl="https://your-org.maps.arcgis.com/arcgis/rest/services/DriveTime/FeatureServer/0"
          />
          <HeatMapOverlay
            view={view}
            serviceUrl="https://your-org.maps.arcgis.com/arcgis/rest/services/Points/FeatureServer/0"
          />
          <FloodZoneOverlay
            view={view}
            serviceUrl="https://landscape11.arcgis.com/arcgis/rest/services/USA_Flood_Hazard_Areas/ImageServer"
          />
        </>
      )}
    </MapView>
  );
}
