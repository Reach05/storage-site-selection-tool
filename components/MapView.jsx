import React, { useEffect, useRef, useState } from 'react'
import { loadModules } from 'esri-loader'

export default function MapView({
  initialCenter = [-118.805, 34.027],
  initialZoom = 12,
  style = { width: '100%', height: '100%' },
  children
}) {
  const containerRef = useRef(null)
  const [view, setView] = useState(null)

  useEffect(() => {
    let mapView
    loadModules(['esri/Map', 'esri/views/MapView'])
      .then(([ArcGISMap, MapView]) => {
        const map = new ArcGISMap({ basemap: 'topo-vector' })
        mapView = new MapView({
          container: containerRef.current,
          map,
          center: initialCenter,
          zoom: initialZoom,
          ui: { components: ['attribution'] } // disable default zoom/compass
        })
        setView(mapView)
      })
      .catch((err) => {
        console.error('MapView loadModules error:', err)
      })

    return () => {
      if (mapView) {
        mapView.destroy()
      }
    }
  }, [initialCenter, initialZoom])

  return (
    <div ref={containerRef} style={style}>
      {view &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, { view })
        )}
    </div>
  )
}