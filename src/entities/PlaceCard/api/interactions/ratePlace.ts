import { useMutation } from '@apollo/client';
import { GET_ALL_PLACES, RATE_PLACE } from 'shared/query/places';
import { type PlaceResponse } from 'shared/types';

interface PlacesData {
  places: PlaceResponse[];
}

export function useRatePlace() {
  const [ratePlace] = useMutation(RATE_PLACE, {
    update(cache, { data: { ratePlace } }) {
      const cachedData = cache.readQuery<PlacesData>({ query: GET_ALL_PLACES });
      if (cachedData?.places) {
        const updatedPlaces = cachedData.places.map((place) =>
          place.properties.id === ratePlace.id ? { ...place, ...ratePlace } : place,
        );

        cache.writeQuery({
          query: GET_ALL_PLACES,
          data: { places: updatedPlaces },
        });
      }
    },
  });

  const handleRating = async (newRating: number, id: string) => {
    try {
      const { data } = await ratePlace({
        variables: { placeId: id, rating: newRating },
      });
      console.log('Place rated:', data?.ratePlace);
    } catch (error) {
      console.error('Error rating place:', error);
    }
  };

  return { handleRating };
}
