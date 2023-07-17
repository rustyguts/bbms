import { LineString } from '@turf/turf';

export function parseGeoJsonLineString(input: any): LineString {
  if (input?.type === 'LineString' && Array.isArray(input?.coordinates)) {
    return input;
  }

  throw new Error('Invalid GeoJSON LineString');
}
