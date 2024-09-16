import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './AuthIndicator.module.scss';

export const AuthIndicator: React.FC = () => {
  const { user, logout, setIsAuthPopup } = useAuth();
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
      <RegularButton
        clickHandler={() => {
          setIsAuthPopup('SignInWithEmail');
        }}
      >
        Sign in
      </RegularButton>
    );
  }

  return (
    <div className={cls.authIndicator} ref={dropdownRef}>
      <div className={cls.userAvatar} onClick={toggleDropdown}>
        <img src={user?.avatar || './user-default-icon.svg'} alt="User avatar" referrerPolicy="no-referrer" />
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
