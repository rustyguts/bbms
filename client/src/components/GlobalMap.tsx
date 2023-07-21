import 'mapbox-gl/dist/mapbox-gl.css'

import PortLayers from './Layers/Ports'
import ShipLayers from './Ships/Ships'
import RouteLayers from './Layers/Routes'
import DrawingTools from './LeftSidebar/DrawingTools'
import RightSidebar from './RightSidebar/RightSidebar'

import { Box } from '@chakra-ui/react'
import { Map, MapLayerMouseEvent } from 'react-map-gl'

export default function GlobalMap() {
  const MAPBOX_ACCESS_TOKEN =
    'pk.eyJ1IjoicnVzdHlndXRzIiwiYSI6ImNsZ2xjM3dpajFuZnAzbG1vNGw5ZnZ6Z3UifQ.JsLP6e8ln8P1kG12yn9Q2g'

  const INITIAL_VIEW_STATE = {
    zoom: 10,
    latitude: 45.813708012585074,
    longitude: -84.79273047874612,
  }

  // const onHover = useCallback((event: MapLayerMouseEvent) => {
  //   const {
  //     features,
  //     point: { x, y },
  //   } = event
  //   const hoveredFeature = features && features[0]
  //   console.log(hoveredFeature)
  // }, [])

  return (
    <Box h="calc(100vh - 50px)" w="100%">
      <Map
        // onMouseMove={onHover}
        attributionControl={false}
        initialViewState={INITIAL_VIEW_STATE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactiveLayerIds={['ports', 'ships', 'routes']}
        // mapStyle="mapbox://styles/mapbox/outdoors-v12"
      >
        <ShipLayers />
        <PortLayers />
        <RouteLayers />
        <DrawingTools />
        <RightSidebar />
      </Map>
    </Box>
  )
}
