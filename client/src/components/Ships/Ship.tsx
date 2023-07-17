// import convert from 'convert'
// import * as turf from '@turf/turf';

import { DateTime } from "luxon";
import { Ship } from "../../types";
import { Layer, LayerProps, Marker, Source } from "react-map-gl";
import { LineString } from "geojson";
import { getShip, getTrips } from "../../api/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GiBoatPropeller } from "react-icons/gi";
import { Box, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react";

const pointLayer: LayerProps = {
  id: 'point',
  type: 'symbol',
  layout: {
    'icon-image': 'cat',
    'icon-size': 0.25
  }
};

export default function ShipEntity({ ship }: { ship: Ship }) {

  const [position, setPosition] = useState(null)

  // const shipsQuery = useQuery({ queryKey: ['ship', ship.id], queryFn: async () => {
  //   return getShip(ship.id)
  // }, initialData: ship, enabled: false })

  const { data: tripsUnderway } = useQuery({ queryKey: ['trips', `shipId=${ship.id}&status=UNDERWAY`], queryFn: getTrips })

  // useEffect(() => {
  //   const animation = window.requestAnimationFrame(() => {
  //     if (tripsUnderway && tripsUnderway.length) {
  //       const t = tripsUnderway[0]
  //       console.log("Updating position")
  //       const hoursElapsed = DateTime.now().diff(
  //         DateTime.fromJSDate(t.createdAt),
  //         'hours',
  //       ).hours;
  //       const nauticalMilesTraveled =
  //         t?.speed * t?.speedMultiplier * hoursElapsed;
  //       const point = turf.along(
  //         turf.lineString(t?.route?.geojson?.coordinates),
  //         convert(nauticalMilesTraveled, 'nautical miles').to('kilometers'),
  //         { units: 'kilometers' },
  //       );
  
  //       console.log("Updating positio2")
  //       console.log(point)
  //       setPosition(point.geometry.coordinates)
  //     }
  //   })

  //   return () => window.cancelAnimationFrame(animation);
  // }, [tripsUnderway]);

  function timeRemaining(date: string | undefined): string {
    if (date) {
      const currentTime = DateTime.now();
      const futureTime = DateTime.fromISO(date);
      const timeDifference = futureTime.diff(currentTime);
      const remainingMinutes = Math.ceil(timeDifference.as('minutes'));
      
      return remainingMinutes + " minutes remaining";
    }
    return ""
  }

  const pointData = {
    type: 'Point',
    coordinates: [ship?.position[1], ship?.position[0]]
  }

  return (
    <Source type="geojson" data={pointData}>
    <Layer type="symbol"
          minzoom={0}
          layout={{
            'icon-image': 'ferry',
            'icon-size': 2,
            'icon-rotate': ['get', 'bearing'],
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true,
            'text-allow-overlap': true,
            'text-ignore-placement': true
          }}/>

      {/* <Layer {...pointLayer}> */}
        
    </Source>
  )

  // return (
  //   <Marker ref={markerRef} latitude={marker.latitude} longitude={marker.longitude}>
  //   </Marker>
  // )

  // return (
  //   <Marker
  //   anchor="center"
  //   latitude={ship?.position[0]}
  //   longitude={ship?.position[1]}
  // >
  //   <Popover closeOnBlur={false}>
  //     <PopoverTrigger>
  //       <Box w='1.5em' h='1.5em'>
  //         <GiBoatPropeller cursor='pointer' color='#E8B00F' size='1.5em' />
  //       </Box>
  //     </PopoverTrigger>
  //     <PopoverContent zIndex={2000}>
  //       <PopoverArrow />
  //       <PopoverCloseButton />
  //       <PopoverHeader>
  //         <Heading size='sm'>
  //           {ship.name}
  //         </Heading>
  //       </PopoverHeader>
  //       <PopoverBody>
  //         <Text>
  //           Speed: {tripsUnderway?.[0]?.speed}kts
  //         </Text>
  //         <Text>
  //           {timeRemaining(tripsUnderway?.[0]?.eta)}
  //         </Text>
  //       </PopoverBody>
  //     </PopoverContent>
  //   </Popover>
  // </Marker>
  // )
}
