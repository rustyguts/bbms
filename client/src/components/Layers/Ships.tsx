import { Marker } from "react-map-gl";
import { getShips } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { GiBoatPropeller } from "react-icons/gi";
import { Box, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";

export default function ShipLayers() {
  const shipsQuery = useQuery({ queryKey: ['ships'], queryFn: getShips })

  return (
    <>
      {shipsQuery?.data?.map((s) => {
        return (
          <Marker
            key={`ship-${s.id}`}
            anchor="center"
            latitude={s.position.latitude}
            longitude={s.position.longitude}
          >
            <Popover closeOnBlur={false}>
              <PopoverTrigger>
                <Box w='auto' h='auto'>
                  <GiBoatPropeller cursor='pointer' color='#E8B00F' size='20px' style={{ stroke: "black", strokeWidth: '2em' }} />
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Heading size='sm'>
                    {s?.name}
                  </Heading>
                </PopoverHeader>
                <PopoverBody>Ship Details</PopoverBody>
              </PopoverContent>
            </Popover>
          </Marker>
        )
      })}
    </>
  )
}
