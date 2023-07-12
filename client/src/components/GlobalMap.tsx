import { divIcon } from "leaflet";
import { useQuery } from "@tanstack/react-query";
import { getPorts, getShips } from "../api/api";
import { renderToStaticMarkup } from "react-dom/server";
import { Box, Button, Heading } from "@chakra-ui/react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { FaAnchor } from 'react-icons/fa';
import { GiBoatPropeller } from 'react-icons/gi';

const customPortIcon = divIcon({
  className: 'custom-icon',
  html: renderToStaticMarkup(
    <FaAnchor color='#E8B00F' size='2em' style={{ stroke: "black", strokeWidth: '2em' }} />
  )
});

const customShipIcon = divIcon({
  className: 'custom-icon',
  html: renderToStaticMarkup(
    <GiBoatPropeller color='#E8B00F' size='2em' style={{ stroke: "black", strokeWidth: '2em' }} />
  )
});


export default function GlobalMap() {
  const shipsQuery = useQuery({ queryKey: ['ships'], queryFn: getShips })
  const portsQuery = useQuery({ queryKey: ['ports'], queryFn: getPorts })

  return (
    <div>
      <Box p='2' h='50px'>
        <Heading size='sm'> Rusty's Shipping Manager </Heading>
      </Box>
      <MapContainer center={[43.82642885999245, -84.3369578664335]} zoom={6} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {shipsQuery?.data?.map((s: any) => {
          return (
            <Marker position={s?.position || [0, 0]} icon={customShipIcon}>
              <Popup>
                <Box>
                  <Heading size='sm'>{s.name}</Heading>
                  <Button colorScheme='blue' size='sm' variant='outline'>
                    Go to Deluth
                  </Button>
                  <Button colorScheme='blue' size='sm' variant='outline'>
                    Go to Cleveland
                  </Button>
                </Box>
              </Popup>
            </Marker>
          )
        })
        }
        {portsQuery?.data?.map((p: any) => {
          return (
            <Marker position={p?.position || [0, 0]} icon={customPortIcon}>
              <Popup>
                {p.name}
              </Popup>
            </Marker>
          )
        })
        }
      </MapContainer>
    </div >
  )
}


