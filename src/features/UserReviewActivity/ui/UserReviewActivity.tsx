import { useQuery } from '@apollo/client';
import { createSearchParams, NavLink } from 'react-router-dom';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { GET_USER_REVIEW_ACTIVITY } from 'shared/query/apolloQuries';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import { ReviewCard } from 'shared/ui/ReviewCard';

interface UserReviewActivityData {
  rating: number | null;
  review: string | null;
  placeName: string;
  placeId: string;
  averageRating: number | null;
}

export const UserReviewActivity = () => {
  const { loading, error, data } = useQuery<{ getUserReviewActivity: UserReviewActivityData[] }>(
    GET_USER_REVIEW_ACTIVITY,
  );

  const { user } = useAuth();

  if (!user) return <p>You need to be logged in to perform this action.</p>;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No yet reviews</p>;

  return (
    <div className="container">
      <h2>My reviews</h2>
      <ul>
        {data.getUserReviewActivity.map((data) => (
          <div key={data.placeId}>
            <NavLink
              to={{
                pathname: '/details',
                search: createSearchParams({ id: data.placeId }).toString(),
              }}
            >
              <div>
                <h3>{data.placeName}</h3>
                {data.averageRating && (
                  <>
                    <RatingWidget isClickable={false} rating={data.averageRating} />{' '}
                    {Boolean(data.averageRating) && data.averageRating}
                  </>
                )}
              </div>
            </NavLink>
            <ReviewCard
              isOwnReview={true}
              id="puk"
              userName={user.displayName}
              reviewText={data.review ? data.review : undefined}
              rating={data.rating ? data.rating : undefined}
              handleDeleteReview={(puk) => {
                console.log(puk);
              }}
            />
          </div>
        ))}
      </ul>
    </div>
  );
};
