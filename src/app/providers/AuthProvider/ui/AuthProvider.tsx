/* eslint-disable @typescript-eslint/no-misused-promises */

import { useCallback, type FC, type PropsWithChildren } from 'react';
import { useState, useEffect } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';
import { type User } from 'shared/types';

import { LOGIN_WITH_GOOGLE_MUTATION, LOGOUT_MUTATION, CURRENT_USER_QUERY } from 'shared/query/user';

import { AuthContext } from '../lib/AuthContext';
import { useGoogleLogin } from '@react-oauth/google';

interface LoginWithGoogleData {
  loginWithGoogle: {
    user: User | null;
  };
}

interface CurrentUserData {
  currentUser: User | null;
}

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [loginWithGoogle] = useMutation<LoginWithGoogleData>(LOGIN_WITH_GOOGLE_MUTATION);

  const [isLoginPopup, setIsLoginPopup] = useState(false);

  const client = useApolloClient();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await client.query<CurrentUserData>({
        query: CURRENT_USER_QUERY,
        fetchPolicy: 'network-only',
      });

      setUser(data.currentUser);
    } catch (error) {
      console.log('Error checking authentication:', error);
      setError(error instanceof Error ? error : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }, [client]);

  useEffect(() => {
    const controller = new AbortController();
    checkAuth();
    return () => {
      controller.abort();
    };
  }, [checkAuth]);

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      if (isLoginPopup) setIsLoginPopup(false);
      setLoading(true);
      try {
        const { data } = await loginWithGoogle({
          variables: { code: tokenResponse.code },
        });
        if (data?.loginWithGoogle.user) {
          setUser(data.loginWithGoogle.user);
          await client.resetStore();
        }
      } catch (err) {
        console.error('Error logging in with Google:', err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred during login'));
      } finally {
        setLoading(false);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
      setError(new Error('Google Login Error'));
      setLoading(false);
    },
  });

  const showLoginPopup = () => {
    setIsLoginPopup(true);
  };

  const closeLoginPopup = () => {
    if (isLoginPopup) setIsLoginPopup(false);
  };

  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await client.mutate({ mutation: LOGOUT_MUTATION });
      console.log(data?.logout.message);
      setUser(null);
      await client.resetStore();
      console.log('Apollo Client cache reset');
    } catch (error) {
      console.error('Error logging out:', error);
      setError(error instanceof Error ? error : new Error('An unknown error occurred during logout'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, isLoginPopup, showLoginPopup, closeLoginPopup, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};
