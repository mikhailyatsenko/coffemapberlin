import { useQuery } from '@apollo/client';
import cls from './Places.module.scss';
import { PlaceCard } from 'entities/PlaceCard';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesData {
  places: PlaceResponse[];
}

export function PlacesList() {
  const { data } = useQuery<PlacesData>(GET_ALL_PLACES);

  console.log('data', data);

  return (
    <div className={cls.Places}>
      {data?.places.map((place, index) => (
        <PlaceCard properties={place.properties} coordinates={place.geometry.coordinates} key={index} isPopup={false} />
      ))}
    </div>
  );
}
