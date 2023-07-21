import { getRoutes } from '../../api/api'
import { Layer, Source } from 'react-map-gl'
import { useQuery } from '@tanstack/react-query'
import { useMapStore } from '../../config/mapStore'

export default function RouteLayers() {
  const { routesVisible } = useMapStore()
  const routesQuery = useQuery({ queryKey: ['routes'], queryFn: getRoutes })

  return (
    <>
      {routesQuery?.data?.map((r) => {
        return (
          <Source key={r.id} type="geojson" data={r.geojson}>
            <Layer
              layout={{
                visibility: routesVisible ? 'visible' : 'none',
              }}
              type="line"
              paint={{
                'line-color': '#007cbf',
                'line-width': 2,
              }}
            />
          </Source>
        )
      })}
    </>
  )
}
