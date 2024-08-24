import { useState } from 'react';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
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
          <RatingWidget rating={1} isClickable={false} />
        </li>
        <li>
          <RatingWidget rating={2} isClickable={false} />
        </li>
        <li>
          <RatingWidget rating={3} isClickable={false} />
        </li>
        <li>
          <RatingWidget rating={4} isClickable={false} />
        </li>
        <li>
          <RatingWidget rating={5} isClickable={false} />
        </li>
      </ul>
    </div>
  );
};
