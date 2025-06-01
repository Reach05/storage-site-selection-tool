import React, { useEffect, useRef, useState } from 'react'
import Map from '@arcgis/core/Map'
import ArcGISMapView from '@arcgis/core/views/MapView'

export default function MapView({
  initialCenter = [39.83, -98.58],
  initialZoom = 12,
  style = { width: '100%', height: '100%' },
  children
}) {
  const containerRef = useRef(null)
  const viewRef = useRef(null)
  const [view, setView] = useState(null)

  useEffect(() => {
    if (viewRef.current) return  // hot-reload guard

    let mv
    const init = async () => {
      const map = new Map({ basemap: 'topo-vector' })
      mv = new ArcGISMapView({
        container: containerRef.current,
        map,
        center: initialCenter,
        zoom: initialZoom,
        ui: { components: ['attribution'] }
      })
      await mv.when()
      viewRef.current = mv
      setView(mv)
    }

    init().catch(console.error)
    return () => {
      mv?.destroy()
      viewRef.current = null
    }
  }, [initialCenter, initialZoom])

  return (
    <div ref={containerRef} style={style}>
      {view &&
        React.Children.map(children, child =>
          React.cloneElement(child, { view })
        )}
    </div>
  )
}