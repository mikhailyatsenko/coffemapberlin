// import { type Geometry } from 'geojson';

import { type Point } from 'geojson';

export interface PlaceProperties {
  name: string;
  description: string;
  address: string;
  image: string;
  instagram: string;
}

// interface Geometry {
//   type: string;
//   coordinates: number[];
// }

export interface Feature {
  type: 'Feature';
  geometry: Point;
  properties: PlaceProperties;
}
