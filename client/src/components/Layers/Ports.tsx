import { FaAnchor } from "react-icons/fa";
import { Marker } from "react-map-gl";
import { getPorts } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { Box, Heading, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@chakra-ui/react";

export default function PortLayers() {
  const portsQuery = useQuery({ queryKey: ['ports'], queryFn: getPorts })

  return (
    <>
      {portsQuery?.data?.map((p: any) => {
        console.log("Ports", p)
        return (
          <Marker
            key={`port-${p.id}`}
            anchor="center"
            latitude={p.position[0]}
            longitude={p.position[1]}
          >
            <Popover>
              <PopoverTrigger>
                <Box w='auto' h='auto'>
                  <FaAnchor cursor='pointer' color='#E8B00F' size='30px' style={{ stroke: "black", strokeWidth: '2em' }} />
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Heading size='sm'>
                    {p?.name}
                  </Heading>
                </PopoverHeader>
                <PopoverBody>Port Details</PopoverBody>
              </PopoverContent>
            </Popover>
          </Marker>
        )
      })}
    </>
  )
}
