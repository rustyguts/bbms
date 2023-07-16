import 'mapbox-gl/dist/mapbox-gl.css';

import PortLayers from './Layers/Ports';
import ShipLayers from './Layers/Ships';
import RouteLayers from './Layers/Routes';

import { Map } from 'react-map-gl';
import { Box } from '@chakra-ui/react';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicnVzdHlndXRzIiwiYSI6ImNsZ2xjM3dpajFuZnAzbG1vNGw5ZnZ6Z3UifQ.JsLP6e8ln8P1kG12yn9Q2g';

const INITIAL_VIEW_STATE = {
  zoom: 5,
  latitude: 45.813708012585074,
  longitude: -84.79273047874612,
};

export default function GlobalMap() {
  return (
    <Box h='calc(100vh - 50px)' w='100%'>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <PortLayers />
        <ShipLayers />
        <RouteLayers />
      </Map>
    </Box>
  );
}
