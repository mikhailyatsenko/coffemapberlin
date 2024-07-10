import { gql } from '@apollo/client';

export const LOGIN_WITH_GOOGLE = gql`
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
