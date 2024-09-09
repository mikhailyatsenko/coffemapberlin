import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { GoogleLoginButton } from 'shared/ui/GoogleLoginButton';
import defaultUserAvatar from '../../../shared/assets/user-default-icon.svg';
import cls from './Auth.module.scss';

export const Auth: React.FC = () => {
  const { user, logout } = useAuth();
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
    return <GoogleLoginButton />;
  }

  return (
    <div className={cls.authIndicator} ref={dropdownRef}>
      <div className={cls.userAvatar} onClick={toggleDropdown}>
        <img src={user?.avatar || defaultUserAvatar} alt="User avatar" referrerPolicy="no-referrer" />
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
