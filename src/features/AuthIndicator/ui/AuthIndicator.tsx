import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from 'shared/lib/reactContext/Auth/useAuth';
import { RegularButton } from 'shared/ui/RegularButton';
import cls from './AuthIndicator.module.scss';

export const AuthIndicator: React.FC = () => {
  const { user, logout, setIsAuthPopup } = useAuth();
  const [isProfileVisible, setProfileVisible] = useState(false);

  const authIndicatorRef = useRef<HTMLDivElement>(null); // Создаем реф для profileCard

  const toggleProfileCard = () => {
    setProfileVisible((prev) => !prev);
    console.log('click avatar');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileVisible && authIndicatorRef.current && !authIndicatorRef.current.contains(event.target as Node)) {
        console.log('click outside');
        setProfileVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileVisible]);

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
    <div className={cls.authIndicator} ref={authIndicatorRef}>
      <div
        className={cls.userAvatar}
        onClick={(e) => {
          e.stopPropagation();
          toggleProfileCard();
        }}
      >
        <img src={user?.avatar || './user-default-icon.svg'} alt="User avatar" referrerPolicy="no-referrer" />
      </div>

      <div className={`${cls.profileCard} ${isProfileVisible ? cls.visible : ''}`}>
        <div className={cls.profileCardAvatar}>
          <img src={user?.avatar || './user-default-icon.svg'} alt="User avatar" referrerPolicy="no-referrer" />
        </div>
        <p className={cls.profileName}>{user?.displayName}</p>
        <p className={cls.profileEmail}>{user?.email}</p>

        {/* <NavLink to={'my-reviews'} className={cls.profileButton}>
          My Reviews
        </NavLink> */}
        {/* <NavLink to={'./profile'} className={cls.profileButton}>
          My Account
        </NavLink> */}

        <div className={cls.divider}></div>
        <div
          className={cls.profileButton}
          onClick={() => {
            logout();
          }}
        >
          Sign out
        </div>
      </div>
    </div>
  );
};
