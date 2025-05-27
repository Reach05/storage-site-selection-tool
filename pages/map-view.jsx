// MapView.jsx
import { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';

export default function MapView({ children }) {
  const container = useRef();
  const [view, setView] = useState(null);

  useEffect(() => {
    loadModules(['esri/Map', 'esri/views/MapView']).then(([Map, EsriMapView]) => {
      const map = new Map({ basemap: 'streets-vector' });
      const mv = new EsriMapView({
        container: container.current,
        map,
        zoom: 10,
        center: [-118.2437, 34.0522]
      });
      setView(mv);
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100vh' }} ref={container}>
      {view &&
        // clone each child with the `view` prop
        React.Children.map(children, (child) =>
          React.cloneElement(child, { view })
        )}
    </div>
  );
}
