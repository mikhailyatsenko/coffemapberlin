/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'app/providers/AuthProvider';
import { GoogleLoginButton } from 'shared/ui/GoogleLoginButton';
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  if (!user) {
    return (
      <GoogleLoginButton
        buttonHandler={() => {
          login();
        }}
      />
    );
  }

  return (
    <div className={cls.authIndicator} ref={dropdownRef}>
      <div className={cls.userAvatar} onClick={toggleDropdown}>
        <img src={user?.avatar ?? '/default-avatar.png'} alt="User avatar" referrerPolicy="no-referrer" />
      </div>

      <span
        className={dropdownOpen ? cls.show : ''}
        onClick={() => {
          logout();
          setDropdownOpen(false);
        }}
      >
        Logout
      </span>
    </div>
  );
};
