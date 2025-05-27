import { useEffect } from 'react';
import { loadModules } from 'esri-loader';

/**
 * Renders a client‐side heatmap from a Feature Service.
 *
 * Props:
 *   - view: the MapView instance
 *   - serviceUrl: URL to a FeatureServer layer (e.g. ".../FeatureServer/0")
 */
export default function HeatMapOverlay({ view, serviceUrl }) {
  useEffect(() => {
    let layer;
    loadModules([
      'esri/layers/FeatureLayer',
      'esri/renderers/HeatmapRenderer'
    ])
      .then(([FeatureLayer, HeatmapRenderer]) => {
        layer = new FeatureLayer({
          url: serviceUrl,
          renderer: new HeatmapRenderer({
            colorStops: [
              { ratio: 0, color: 'rgba(63, 40, 102, 0)' },
              { ratio: 0.2, color: 'purple' },
              { ratio: 0.4, color: 'blue' },
              { ratio: 0.6, color: 'cyan' },
              { ratio: 0.8, color: 'lime' },
              { ratio: 1, color: 'yellow' }
            ],
            maxPixelIntensity: 100,
            minPixelIntensity: 0
          }),
          opacity: 0.7
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
