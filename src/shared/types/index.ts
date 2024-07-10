import { type Point } from 'geojson';

export interface PlaceProperties {
  name: string;
  description: string;
  address: string;
  image: string;
  instagram: string;
}

export interface Feature {
  type: 'Feature';
  geometry: Point;
  properties: PlaceProperties;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}
