import cls from './PlaceCard.module.scss';
import instagram from '../../../shared/assets/instagram.svg';
import { useContext } from 'react';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { RATE_PLACE } from 'shared/query/places';
import { useMutation } from '@apollo/client';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { type PlaceProperties } from 'shared/types';
import { type Position } from 'geojson';

interface PlaceCardProps {
  properties: PlaceProperties;
  coordinates: Position;
  isPopup: boolean;
}

export const PlaceCard = ({ coordinates, isPopup = false, properties }: PlaceCardProps) => {
  console.log('in card', coordinates, isPopup, properties);

  const { id, userRating, ratingCount, averageRating, favoriteCount, isFavorite } = properties;
  /// /////test

  const [ratePlace] = useMutation(RATE_PLACE, {
    // update(cache, { data: { ratePlace } }) {
    //   const { places } = cache.readQuery({ query: GET_ALL_PLACES });
    //   const updatedPlaces = places.map((place) => (place.id === ratePlace.id ? { ...place, ...ratePlace } : place));
    //   cache.writeQuery({
    //     query: GET_ALL_PLACES,
    //     data: { places: updatedPlaces },
    //   });
    // },
  });

  const handleRating = async (newRating: number) => {
    try {
      const { data } = await ratePlace({
        variables: { placeId: id, rating: newRating },
      });
      console.log('Place rated:', data?.ratePlace);
    } catch (error) {
      console.error('Error rating place:', error);
    }
  };

  // review

  // const [addReview] = useMutation(ADD_REVIEW);
  // const [reviewText, setReviewText] = useState('');

  // const handleReviewSubmit = async (text: string) => {
  //   // e.preventDefault();
  //   try {
  //     const { data } = await addReview({
  //       variables: { placeId: id, text },
  //     });
  //     console.log('Review added:', data.addReview);
  //     // setReviewText(''); // Очистить поле ввода после успешного добавления
  //   } catch (error) {
  //     console.error('Error adding review:', error);
  //   }
  // };

  // review

  // toglle favorite

  // interface FavoriteActionResult {
  //   success: boolean;
  //   message: string | null;
  //   requiresAuth: boolean;
  //   place: PlaceResponse | null;
  // }

  // interface ToggleFavoriteMutationData {
  //   toggleFavorite: FavoriteActionResult;
  // }

  // interface ToggleFavoriteMutationVariables {
  //   placeId: string;
  // }

  // const [toggleFavorite, { loading }] = useMutation<ToggleFavoriteMutationData, ToggleFavoriteMutationVariables>(
  //   TOGGLE_FAVORITE,
  //   {
  //     onCompleted: (data) => {
  //       // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  //       if (data?.toggleFavorite) {
  //         if (data.toggleFavorite.requiresAuth) {
  //           alert(data.toggleFavorite.message ?? 'Authentication required');
  //         } else if (!data.toggleFavorite.success) {
  //           console.error('Failed to toggle favorite:', data.toggleFavorite.message);
  //         }
  //       }
  //     },
  //     onError: (error) => {
  //       console.error('Error toggling favorite:', error);
  //     },
  //   },
  // );

  // const handleToggle = async () => {
  //   await toggleFavorite({
  //     variables: { placeId: id },
  //     update: (cache, { data }) => {
  //       if (data?.toggleFavorite.success && data.toggleFavorite.place) {
  //         cache.modify({
  //           id: cache.identify({ __typename: 'Place', id }),
  //           fields: {
  //             isFavorite: () => data.toggleFavorite.place!.isFavorite,
  //             favoriteCount: () => data.toggleFavorite.place!.favoriteCount,
  //           },
  //         });
  //       }
  //     },
  //   });
  // };

  // toglle favorite

  /// /////test
  const { setLocation } = useContext(LocationContext);
  const handleClick = () => {
    if (coordinates && setLocation) {
      setLocation(coordinates);
    }
  };
  return (
    <div onClick={handleClick} className={`${cls.placeCard} ${isPopup ? cls.popupCard : ''}`}>
      <div
        className={cls.image}
        style={{
          backgroundImage: `url("${'./places-images/' + properties.image}")`,
        }}
      ></div>
      <div className={cls.content}>
        <a className={cls.header} href={properties.instagram} target="_blank" rel="noreferrer">
          <h4 className={cls.name}>{properties.name}</h4>
          <img className={cls.instagram} src={instagram} alt="" />
        </a>

        <div className={cls.description}>{properties.description}</div>

        <div className={cls.adress}>{properties.address}</div>
        {/* <div>Rating: {averageRating}</div>
        <div>Rating count: {ratingCount}</div> */}
        <RatingWidget rating={averageRating} handleRating={handleRating} />
        {/* <div>Favorite count: {favoriteCount}</div>
        <div>IsFavorite: {isFavorite ? 'true' : 'false'}</div>
        <div
          onClick={async () => {
            await handleToggle();
          }}
        >
          add to Favorite
        </div>
        <div
          onClick={async () => {
            await handleReviewSubmit('test1');
          }}
        >
          Add comment test1:
        </div> */}
      </div>
    </div>
  );
};
