import { gql } from '@apollo/client';

export const LOGIN_WITH_GOOGLE_MUTATION = gql`
  mutation LoginWithGoogle($code: String!) {
    loginWithGoogle(code: $code) {
      user {
        id
        email
        displayName
        avatar
      }
    }
  }
`;

export const SIGN_IN_WITH_EMAIL = gql`
  mutation SignInWithEmail($email: String!, $password: String!) {
    signInWithEmail(email: $email, password: $password) {
      user {
        id
        email
        displayName
      }
    }
  }
`;

export const CURRENT_USER_QUERY = gql`
  query CurrentUser {
    currentUser {
      id
      displayName
      email
      avatar
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

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

export const TOGGLE_FAVORITE = gql`
  mutation ToggleFavorite($placeId: ID!) {
    toggleFavorite(placeId: $placeId)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $displayName: String!, $password: String!) {
    registerUser(email: $email, displayName: $displayName, password: $password) {
      user {
        id
        displayName
        email
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview($placeId: ID!, $text: String, $rating: Float) {
    addReview(placeId: $placeId, text: $text, rating: $rating) {
      review {
        id
        text
        userId
        userName
        userAvatar
        placeId
        createdAt
        isOwnReview
        userRating
      }
      averageRating
      ratingCount
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($reviewId: ID!) {
    deleteReview(reviewId: $reviewId) {
      reviewId
      averageRating
      ratingCount
    }
  }
`;

export const GET_PLACE_DETAILS = gql`
  query PlaceDetails($placeId: ID!) {
    placeDetails(placeId: $placeId) {
      id
      reviews {
        id
        text
        userId
        userName
        userAvatar
        createdAt
        userRating
        isOwnReview
      }
    }
  }
`;
