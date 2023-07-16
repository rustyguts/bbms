
import { getRoutes } from "../../api/api";
import { useQuery } from "@tanstack/react-query"
import { Layer, LineLayer, Source } from "react-map-gl";

export default function RouteLayers() {
  const layerStyle: LineLayer = {
    source: '',
    id: 'point',
    type: 'line',
    paint: {
      'line-color': '#007cbf',
      'line-width': 3,
    }
  };

  const routesQuery = useQuery({ queryKey: ['routes'], queryFn: getRoutes })

  return (
    <>
      {routesQuery?.data?.map((r) => {
        return (
          <Source key={r.id} id="routes" type="geojson" data={r.geojson}>
            <Layer {...layerStyle} />
          </Source>
        )
      })}
    </>
  )
}


