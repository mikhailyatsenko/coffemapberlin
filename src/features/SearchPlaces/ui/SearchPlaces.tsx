import { useEffect, useRef, useState } from 'react';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { SearchPlacesForm } from 'entities/SearchPlacesForm';
import { RatingFilter } from 'entities/SearchPlacesForm/ui/RatingFilter';
import cls from './SearchPlaces.module.scss';

export const SearchPlaces = () => {
  const { setMinRating, setSearchTerm, searchTerm, minRating } = usePlaces();

  const [isActive, setIsActive] = useState<boolean>(false);
  const SearchPlacesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      SearchPlacesRef.current?.focus();
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (SearchPlacesRef.current && !SearchPlacesRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.addEventListener('mousedown', handleClickOutside);
    };
  }, [isActive]);

  return (
    <div
      onClick={() => {
        setIsActive(true);
      }}
      className={cls.SearchPlaces}
      ref={SearchPlacesRef}
    >
      <SearchPlacesForm searchValue={searchTerm} setValueHandler={setSearchTerm} isActive={isActive} />
      {isActive && (
        <div className={cls.filter}>
          <RatingFilter filterRating={minRating} setFilterRating={setMinRating} />
        </div>
      )}
    </div>
  );
};
