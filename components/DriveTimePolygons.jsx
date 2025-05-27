import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

/**
 * Renders drive-time polygons from an ArcGIS Feature Service.
 *
 * Props:
 *   - view: the MapView instance
 *   - serviceUrl: URL to a FeatureServer layer (e.g. ".../FeatureServer/0")
 */
export default function DriveTimePolygons({ view, serviceUrl }) {
  useEffect(() => {
    let layer;
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        layer = new FeatureLayer({
          url: serviceUrl,
          // you can customize renderer, opacity, etc, here
          opacity: 0.5
        });
        view.map.add(layer);
      })
      .catch(console.error);

    return () => {
      if (layer) {
        view.map.remove(layer);
      }
    };
  }, [view, serviceUrl]);

  return null;
}
