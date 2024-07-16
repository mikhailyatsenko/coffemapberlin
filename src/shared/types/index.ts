import { type Position, type Point } from 'geojson';

export interface PlaceProperties {
  id: string;
  name: string;
  description: string;
  address: string;
  image: string;
  instagram: string;
  averageRating: number;
  userRating: number;
  ratingCount: number;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface User {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
}
export interface PlaceResponse {
  type: 'Feature';
  geometry: Point;
  properties: PlaceProperties;
}
