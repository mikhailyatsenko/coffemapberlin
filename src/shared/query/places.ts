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

export const ADD_REVIEW = gql`
  mutation AddReview($placeId: ID!, $text: String!) {
    addReview(placeId: $placeId, text: $text) {
      id
      userId
      placeId
      review
      date
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
