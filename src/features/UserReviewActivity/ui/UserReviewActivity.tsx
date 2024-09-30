import { useQuery } from '@apollo/client';
import { createSearchParams, NavLink } from 'react-router-dom';
import { ReviewActivityCard } from 'entities/ReviewActivityCard';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { GET_USER_REVIEW_ACTIVITY } from 'shared/query/apolloQuries';

interface UserReviewActivityData {
  rating: number | null;
  review: string | null;
  placeName: string;
  placeId: string;
  averageRating: number | null;
  createdAt: string;
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
              <ReviewActivityCard
                userRating={data.rating}
                review={data.review}
                placeName={data.placeName}
                averageRating={data.averageRating}
                createdAt={data.createdAt}
              />
            </NavLink>
          </div>
        ))}
      </ul>
    </div>
  );
};
