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
        name
        description
        address
        image
        instagram
      }
    }
  }
`;
