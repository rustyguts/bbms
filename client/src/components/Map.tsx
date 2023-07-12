import 'mapbox-gl/dist/mapbox-gl.css';

import { Map } from 'react-map-gl';
import PortLayers from './Layers/Ports';
import ShipLayers from './Layers/Ships';
import { Box, Heading } from '@chakra-ui/react';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicnVzdHlndXRzIiwiYSI6ImNsZ2xjM3dpajFuZnAzbG1vNGw5ZnZ6Z3UifQ.JsLP6e8ln8P1kG12yn9Q2g';

const INITIAL_VIEW_STATE = {
  zoom: 5,
  latitude: 45.813708012585074,
  longitude: -84.79273047874612,
};

export default function GlobalMap2() {
  return (
    <Box>
      <Box h='50px' p='2'>
        <Heading size='sm'> Rusty's Shipping Manager 2 </Heading>
      </Box>
      <Box h='calc(100vh - 50px)' w='100%'>
        <Map
          mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
          initialViewState={INITIAL_VIEW_STATE}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          <PortLayers />
          <ShipLayers />
        </Map>
      </Box>
    </Box>
  );
}
