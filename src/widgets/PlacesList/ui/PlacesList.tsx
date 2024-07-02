import cls from './Places.module.scss';
import { PlaceCard } from 'entities/PlaceCard';
import { type Feature } from 'shared/types';

interface PlacesListProps {
  places: Feature[];
}

export function PlacesList({ places }: PlacesListProps) {
  return (
    <div className={cls.Places}>
      {places.map((place, index) => (
        <PlaceCard placeProperties={place.properties} coordinates={place.geometry.coordinates} key={index} />
      ))}
    </div>
  );
}
