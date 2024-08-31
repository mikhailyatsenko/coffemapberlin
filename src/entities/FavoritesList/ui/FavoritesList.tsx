import { PlaceCard } from 'features/PlaceCard';
import { TooltipCardOnMap } from 'features/TooltipCardOnMap';
import { type PlaceResponse } from 'shared/types';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import cls from './FavoritesList.module.scss';

interface FavoritesListProps {
  favoritesPlacesList: PlaceResponse[];
}

export const FavoritesList = ({ favoritesPlacesList }: FavoritesListProps) => {
  return (
    <div className={cls.FavoritesList}>
      {favoritesPlacesList.map((place) => (
        // <div
        //   onClick={(e) => {
        //     e.stopPropagation();
        //     // onSelect(place.properties.id);
        //   }}
        //   key={place.properties.id}
        //   className={`${cls.resultPlace} ${cls.resultPlaceActive}`}
        // >
        //   <div className={cls.placeName}>{place.properties.name}</div>
        //   <RatingWidget isClickable={false} rating={place.properties.averageRating} />
        //   <div className={cls.placeAddress}>{place.properties.address}</div>
        // </div>

        <PlaceCard key={place.properties.id} properties={place.properties} coordinates={place.geometry.coordinates} />
      ))}
    </div>
  );
};
