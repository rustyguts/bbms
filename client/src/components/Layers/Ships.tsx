import { Marker } from "react-map-gl";
import { getShips } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { GiBoatPropeller } from "react-icons/gi";
import { Box, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";

export default function ShipLayers() {
  const shipsQuery = useQuery({ queryKey: ['ships'], queryFn: getShips })

  return (
    <>
      {shipsQuery?.data?.map((s: any) => {
        return (
          <Marker
            key={`ship-${s.id}`}
            anchor="center"
            latitude={s.position[0]}
            longitude={s.position[1]}
          >
            <Popover placement='bottom'>
              <PopoverTrigger>
                <Box w='auto' h='auto'>
                  <GiBoatPropeller cursor='pointer' color='#E8B00F' size='30px' style={{ stroke: "black", strokeWidth: '2em' }} />
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
