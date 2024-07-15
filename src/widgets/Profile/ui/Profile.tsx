import React, { useState } from 'react';
import { useAuth } from 'app/providers/AuthProvider';
import { type Feature } from 'shared/types';
// import './Profile.css';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Feature[]>([]);
  const [reviews, setReviews] = useState<Array<{ cafe: Feature; rating: number; comment: string }>>([]);

  // useEffect(() => {
  //   if (user) {
  //     fetchFavorites();
  //     fetchReviews();
  //   }
  // }, [user]);

  // const fetchFavorites = async () => {
  //   try {
  //     const response = await fetch(`/users/favorites`, { credentials: 'include' });
  //     const data = await response.json();
  //     setFavorites(data);
  //   } catch (error) {
  //     console.error('Error fetching favorites:', error);
  //   }
  // };

  // const fetchReviews = async () => {
  //   try {
  //     const response = await fetch(`/users/reviews`, { credentials: 'include' });
  //     const data = await response.json();
  //     setReviews(data);
  //   } catch (error) {
  //     console.error('Error fetching reviews:', error);
  //   }
  // };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" referrerPolicy="no-referrer" />
        <h1 className="profile-name">{user.displayName}</h1>
      </div>

      <div className="profile-section">
        <h2>Favorites</h2>
        <div className="cafe-list">
          {/* {favorites.map((cafe) => (
            <div key={cafe._id} className="cafe-card">
              <img src={cafe.properties.image} alt={cafe.properties.name} />
              <h3>{cafe.properties.name}</h3>
              <p>{cafe.properties.address}</p>
            </div>
          ))} */}
        </div>
      </div>

      <div className="profile-section">
        {/* <h2>Reviews</h2>
        <div className="review-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <img
                  src={review.cafe.properties.image}
                  alt={review.cafe.properties.name}
                  className="review-cafe-image"
                />
                <h3>{review.cafe.properties.name}</h3>
                <div className="review-rating">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};
