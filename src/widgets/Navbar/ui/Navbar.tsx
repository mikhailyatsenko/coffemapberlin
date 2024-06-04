import { useEffect, useState } from 'react';
import cls from './Navbar.module.scss';
// import { Logo } from 'shared/ui/Logo';
import { NavLink } from 'react-router-dom';
import { Logo } from 'shared/ui/Logo';

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
      <NavLink className={({ isActive }) => (isActive ? cls.active : '')} to={'/'}>
        <div className={cls.logo}>
          <Logo />
        </div>
      </NavLink>
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
            to={'search'}
          >
            Search
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
            Contacts
          </NavLink>
        </li>
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
