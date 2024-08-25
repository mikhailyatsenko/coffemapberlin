import { useState } from 'react';
import BeanIcon from 'shared/ui/RatingWidget/ui/BeanIcon';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
import clearIcon from '../../../shared/assets/clear-icon.svg';
import cls from './RatingFilter.module.scss';

interface RatingFilterProps {
  filterRating: number;
  setFilterRating: (rating: number) => void;
}

export const RatingFilter = ({ setFilterRating, filterRating }: RatingFilterProps) => {
  const [isViewFilters, setIsViewFilters] = useState(false);

  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className={`${cls.dropdown} ${isViewFilters ? cls.viewFilters : ''}`}>
      <button
        onClick={() => {
          setIsViewFilters((prew) => !prew);
        }}
        className={cls.dropdownBtn}
        aria-haspopup="menu"
      >
        {filterRating === 0 ? (
          'min. rating'
        ) : (
          <div className={cls.beanAndRating}>
            <BeanIcon color="#ffffff" filled={false} /> <p>{filterRating}</p>
          </div>
        )}
        <div className={cls.arrow}></div>
        {filterRating !== 0 && (
          <li
            className={cls.clearFilterRating}
            onClick={() => {
              setFilterRating(0);
              setIsViewFilters(false);
            }}
          >
            <img className={cls.clearIcon} src={clearIcon} alt="Clear icon" />
          </li>
        )}
      </button>
      <ul className={cls.dropdownContent} role="menu">
        {ratings.map((rating) => (
          <li
            key={rating}
            onClick={() => {
              setFilterRating(rating);
              setIsViewFilters(false);
            }}
          >
            <RatingWidget rating={rating} isClickable={false} />
          </li>
        ))}
      </ul>
    </div>
  );
};
