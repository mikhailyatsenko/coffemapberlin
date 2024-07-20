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
