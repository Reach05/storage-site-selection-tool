import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

/**
 * Renders the Living Atlas Flood Hazard as a GeoJSONLayer.
 *
 * Props:
 *   - view: the MapView instance
 *   - serviceUrl: URL to the ImageServer (e.g.
 *       "https://landscape11.arcgis.com/arcgis/rest/services/USA_Flood_Hazard_Areas/ImageServer")
 */
export default function FloodZoneOverlay({ view, serviceUrl }) {
  useEffect(() => {
    let geojsonLayer;

    loadModules(['esri/layers/GeoJSONLayer'])
      .then(([GeoJSONLayer]) => {
        // construct a REST query URL that returns GeoJSON
        const queryUrl = `${serviceUrl}/query?f=geojson&where=1=1&outFields=*`;

        geojsonLayer = new GeoJSONLayer({
          url: queryUrl,
          opacity: 0.5,
          renderer: {
            type: 'simple', // autocasts to SimpleRenderer
            symbol: {
              type: 'simple-fill', // autocasts to SimpleFillSymbol
              color: 'rgba(0,0,255,0.3)',
              outline: { width: 1, color: '#0000FF' }
            }
          }
        });

        view.map.add(geojsonLayer);
      })
      .catch(console.error);

    return () => {
      if (geojsonLayer) {
        view.map.remove(geojsonLayer);
      }
    };
  }, [view, serviceUrl]);

  return null;
}
