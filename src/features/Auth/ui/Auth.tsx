/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'app/providers/AuthProvider';
import { Link } from 'react-router-dom';
import cls from './Auth.module.scss';

export const Auth: React.FC = () => {
  const { user, logout, login } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  if (!user) {
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
