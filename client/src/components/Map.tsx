import 'mapbox-gl/dist/mapbox-gl.css';

import { CircleLayer, Layer, Map, Source, LineLayer } from 'react-map-gl';
import PortLayers from './Layers/Ports';
import ShipLayers from './Layers/Ships';
import { Box } from '@chakra-ui/react';

import type { FeatureCollection } from 'geojson';
import { route } from './Layers/layer.ts'

// const geojson: FeatureCollection = {
//   type: 'FeatureCollection',
//   features: [
//     { type: 'Feature', geometry: { type: 'Point', coordinates: [-122.4, 37.8] } }
//   ]
// };

const layerStyle: LineLayer = {
  source: '',
  id: 'point',
  type: 'line',
  paint: {
    'line-color': '#007cbf',
    'line-width': 3,
  }
};

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoicnVzdHlndXRzIiwiYSI6ImNsZ2xjM3dpajFuZnAzbG1vNGw5ZnZ6Z3UifQ.JsLP6e8ln8P1kG12yn9Q2g';

const INITIAL_VIEW_STATE = {
  zoom: 5,
  latitude: 45.813708012585074,
  longitude: -84.79273047874612,
};

export default function GlobalMap2() {
  return (
    <Box h='calc(100vh - 50px)' w='100%'>
      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <PortLayers />
        <ShipLayers />
        <Source id="routes" type="geojson" data={route}>
          <Layer {...layerStyle} />
        </Source>
      </Map>
    </Box>
  );
}
