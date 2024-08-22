import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Auth } from 'features/Auth';
import { SearchPlaces } from 'features/SearchPlaces';
import { Logo } from 'shared/ui/Logo';
import cls from './Navbar.module.scss';

export const Navbar = () => {
  const [isBurgerActive, setIsBurgerActive] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      setIsBurgerActive(false);
    });

    return () => {
      window.removeEventListener('scroll', () => {
        setIsBurgerActive(false);
      });
    };
  }, []);

  return (
    <nav className={cls.navbar}>
      {isBurgerActive ? (
        <div
          onClick={() => {
            setIsBurgerActive(false);
          }}
          className={cls.menuOverlay}
        ></div>
      ) : (
        ''
      )}
      <NavLink to={'/'}>
        <div className={cls.logo}>
          <Logo />
        </div>
      </NavLink>
      <SearchPlaces />
      <ul className={`${cls.navMenu} ${isBurgerActive ? cls.active : ''}`}>
        <li className={cls.navItem}>
          <NavLink
            onClick={() => {
              setIsBurgerActive(false);
            }}
            className={({ isActive }) => (isActive ? cls.active : '')}
            to={'/'}
          >
            Map
          </NavLink>
        </li>
        <li className={cls.navItem}>
          <NavLink
            onClick={() => {
              setIsBurgerActive(false);
            }}
            className={({ isActive }) => (isActive ? cls.active : '')}
            to={'about'}
          >
            About
          </NavLink>
        </li>
        <li className={cls.navItem}>
          <NavLink
            onClick={() => {
              setIsBurgerActive(false);
            }}
            className={({ isActive }) => (isActive ? cls.active : '')}
            to={'contacts'}
          >
            Contact
          </NavLink>
        </li>
        <Auth />
      </ul>
      <div
        onClick={() => {
          setIsBurgerActive((prevState) => !prevState);
        }}
        className={`${cls.hamburger} ${isBurgerActive ? cls.active : ''}`}
      >
        <span className={cls.bar}></span>
        <span className={cls.bar}></span>
        <span className={cls.bar}></span>
      </div>
    </nav>
  );
};
