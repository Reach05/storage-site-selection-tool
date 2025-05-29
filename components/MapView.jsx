import React, { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

export default function MapView({
  initialCenter = [-118.805, 34.027],
  initialZoom = 12,
  style = { width: '100%', height: '100%' },
  children
}) {
  const containerRef = useRef(null);
  const [view, setView] = useState(null);

  useEffect(() => {
    let mv;
    const init = async () => {
      const map = new Map({ basemap: 'topo-vector' });
      mv = new MapView({
        container: containerRef.current,
        map,
        center: initialCenter,
        zoom: initialZoom,
        ui: { components: ['attribution'] }
      });
      await mv.when();
      setView(mv);
    };
    init().catch(console.error);
    return () => mv?.destroy();
  }, [initialCenter, initialZoom]);

  return (
    <div ref={containerRef} style={style}>
      {view &&
        React.Children.map(children, child =>
          React.cloneElement(child, { view })
        )}
    </div>
  );
}