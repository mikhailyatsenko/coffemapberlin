import { useState } from 'react';
import cls from './RatingFilter.module.scss';

// export interface RatingFilterProps {
//   isActive: boolean;
// }

export const RatingFilter = () => {
  const [isViewFilters, setIsViewFilters] = useState(false);
  return (
    <div className={`${cls.dropdown} ${isViewFilters ? cls.viewFilters : ''}`}>
      <button
        onClick={() => {
          setIsViewFilters((prew) => !prew);
        }}
        className={cls.dropdownBtn}
        aria-haspopup="menu"
      >
        <span>with rating</span>
        <span className={cls.arrow}></span>
      </button>
      <ul className={cls.dropdownContent} role="menu">
        <li>
          <a href="#">React</a>
        </li>
        <li>
          <a href="#">Angular</a>
        </li>
        <li>
          <a href="#">Vue</a>
        </li>
        <li>
          <a href="#">Svelte</a>
        </li>
      </ul>
    </div>
  );
};
