import { LineString } from 'geojson';

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

export interface Trip {
  id: string;
  name: string;
  eta: string;
  etd: string;
  route: Route;
  speed: number;
  speedMultiplier: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  name: string;
  geojson: LineString;
}
