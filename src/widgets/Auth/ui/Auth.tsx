/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'app/providers/AuthProvider';
import { Link } from 'react-router-dom';
import cls from './Auth.module.scss';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@apollo/client';
import { LOGIN_WITH_GOOGLE } from 'shared/query/user';

export const Auth: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE);
  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (tokenResponse) => {
      try {
        const { data } = await loginWithGoogle({
          variables: { code: tokenResponse.code },
        });
        console.log('Logged in user:', data.loginWithGoogle.user);
        // Здесь вы можете обновить состояние приложения или перенаправить пользователя
      } catch (err) {
        console.error('Error logging in with Google:', err);
      }
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <li
        onClick={() => {
          login();
        }}
        className={cls.loginButton}
      >
        Login
      </li>
    );
  }

  return (
    <div className={cls.authIndicator} ref={dropdownRef}>
      <div
        className={cls.userAvatar}
        onClick={() => {
          setDropdownOpen(!dropdownOpen);
        }}
      >
        <img src={user?.avatar ?? '/default-avatar.png'} alt="User avatar" referrerPolicy="no-referrer" />
      </div>
      {dropdownOpen && (
        <div className={cls.dropdown}>
          <Link
            to="/profile"
            onClick={() => {
              setDropdownOpen(false);
            }}
          >
            Profile
          </Link>
          <button
            onClick={() => {
              logout();
              setDropdownOpen(false);
            }}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
