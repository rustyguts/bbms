import { FeatureCollection } from 'geojson';

export interface Port {
  id: string;
  name: string;
  position: number[];
}

export interface Ship {
  id: string;
  name: string;
  position: number[];
}

export interface Route {
  id: string;
  name: string;
  geojson: FeatureCollection;
}
