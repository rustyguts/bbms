import { LineString } from '@turf/turf'
import { parseGeoJsonLineString } from './geojson'

describe('parseGeoJsonLineString', () => {
  test('should return the LineString when input is valid', () => {
    const input: LineString = {
      type: 'LineString',
      coordinates: [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
    }

    expect(parseGeoJsonLineString(input)).toEqual(input)
  })

  test('should throw an error when input type is not "LineString"', () => {
    const input: any = {
      type: 'Point',
      coordinates: [0, 0],
    }

    expect(() => parseGeoJsonLineString(input)).toThrowError(
      'Invalid GeoJSON LineString'
    )
  })

  test('should throw an error when coordinates are not an array', () => {
    const input: any = {
      type: 'LineString',
      coordinates: 'invalid-coordinates',
    }

    expect(() => parseGeoJsonLineString(input)).toThrowError(
      'Invalid GeoJSON LineString'
    )
  })

  test('should throw an error when input is missing', () => {
    expect(() => parseGeoJsonLineString(undefined)).toThrowError(
      'Invalid GeoJSON LineString'
    )
  })
})
