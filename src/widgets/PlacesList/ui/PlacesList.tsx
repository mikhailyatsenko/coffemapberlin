import cls from './Places.module.scss';
import { PlaceCard } from 'entities/PlaceCard';
import { type MyFeature } from 'shared/types';

interface PlacesListProps {
  places: MyFeature[];
}

export function PlacesList({ places }: PlacesListProps) {
  console.log(places);
  return (
    <div className={cls.Places}>
      {places.map((place, index) => (
        <PlaceCard
          id={place.id}
          properties={place.properties}
          averageRating={place.averageRating}
          ratingCount={place.ratingCount}
          isFavorite={place.isFavorite}
          favoriteCount={place.favoriteCount}
          coordinates={place.geometry.coordinates}
          key={index}
        />
      ))}
    </div>
  );
}
