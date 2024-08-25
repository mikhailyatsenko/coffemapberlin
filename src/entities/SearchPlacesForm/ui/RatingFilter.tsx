import { useState } from 'react';
import BeanIcon from 'shared/ui/RatingWidget/ui/BeanIcon';
import RatingWidget from 'shared/ui/RatingWidget/ui/RatingWidget';
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
        <div>
          {filterRating === 0 ? (
            'min. rating'
          ) : (
            <div className={cls.beanAndRating}>
              <BeanIcon color="#ffffff" filled={false} /> {filterRating}
            </div>
          )}
        </div>
        <div className={cls.arrow}></div>
      </button>
      <ul className={cls.dropdownContent} role="menu">
        <li
          onClick={() => {
            setFilterRating(0);
            setIsViewFilters(false);
          }}
        >
          Any
        </li>

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
