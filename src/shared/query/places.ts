import { gql } from '@apollo/client';

export const GET_ALL_PLACES = gql`
  query GetAllPlaces {
    places {
      type
      geometry {
        type
        coordinates
      }
      properties {
        id
        name
        description
        address
        image
        instagram
        averageRating
        ratingCount
        isFavorite
        favoriteCount
      }
    }
  }
`;

export const RATE_PLACE = gql`
  mutation RatePlace($placeId: ID!, $rating: Int!) {
    ratePlace(placeId: $placeId, rating: $rating) {
      id
      averageRating
      ratingCount
      userRating
    }
  }
`;

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($placeId: ID!) {
    toggleFavorite(placeId: $placeId) {
      success
      message
      requiresAuth
      place {
        id
        isFavorite
        favoriteCount
      }
    }
  }
`;

export const GET_PLACE_REVIEWS = gql`
  query GetPlaceReviews($placeId: ID!) {
    placeReviews(placeId: $placeId) {
      id
      userName
      userAvatar
      text
      userId
      userRating
      createdAt
      isOwnReview
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($placeId: ID!, $text: String!) {
    addReview(placeId: $placeId, text: $text) {
      id
      text
      userId
      placeId
      createdAt
    }
  }
`;
export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      success
      message
    }
  }
`;
