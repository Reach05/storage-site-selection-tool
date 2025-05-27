// components/MapView.jsx
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { loadModules } from 'esri-loader';

const MapView = forwardRef(function MapView(_, ref) {
  const containerRef = useRef();
  const viewRef = useRef();

  useImperativeHandle(ref, () => viewRef.current, []);

  useEffect(() => {
    let view;
    (async () => {
      const [Map, MapView] = await loadModules([
        'esri/Map',
        'esri/views/MapView'
      ]);
      view = new MapView({
        container: containerRef.current,
        map: new Map({ basemap: 'streets-vector' }),
        center: [-118.805, 34.027],
        zoom: 13
      });
      viewRef.current = view;
    })();

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return <div style={{ width: '100%', height: '100vh' }} ref={containerRef} />;
});

export default MapView;
