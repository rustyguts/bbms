import { useEffect, useMemo, useState } from 'react'
import { CircleLayer, Layer, Marker, Source, useMap } from 'react-map-gl'
import { getPorts } from '../../api/api'
import { FaAnchor } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { Port } from '../../types'
import { Feature, FeatureCollection } from 'geojson'

export default function PortLayers() {
  const portsQuery = useQuery({ queryKey: ['ports'], queryFn: getPorts })

  const geojson: FeatureCollection | undefined = useMemo(() => {
    if (portsQuery?.data?.length) {
      const features = portsQuery?.data?.map((p): Feature => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [p.position[1], p.position[0]],
          },
          properties: {
            id: p.id,
            name: p.name,
          },
        }
      })

      return {
        type: 'FeatureCollection',
        features,
      }
    }
  }, [portsQuery])

  const layerStyle: CircleLayer = {
    source: 'ports',
    id: 'ports',
    type: 'circle',
    paint: {
      'circle-radius': 1,
      'circle-color': '#007cbf',
    },
  }

  if (!geojson) return null

  return (
    <Source type="geojson" data={geojson}>
      <Layer {...layerStyle} />
      {geojson.features.map((f: Feature) => {
        return (
          <Marker
            key={`port-${f.properties.id}`}
            latitude={f.geometry.coordinates[1]}
            longitude={f.geometry.coordinates[0]}
          >
            <Popover closeOnBlur={false}>
              <PopoverTrigger>
                <Box w="auto" h="auto">
                  <FaAnchor
                    key={`port-${f.properties.id}`}
                    cursor="pointer"
                    color="#E8B00F"
                    size="20px"
                    style={{
                      stroke: 'black',
                      strokeWidth: '2em',
                    }}
                  />
                </Box>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>
                  <Heading size="sm">Port of {f.properties.name}</Heading>
                </PopoverHeader>
                <PopoverBody>Port Details</PopoverBody>
              </PopoverContent>
            </Popover>
          </Marker>
        )
      })}
    </Source>
  )
}
