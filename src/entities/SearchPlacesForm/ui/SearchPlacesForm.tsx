import { useEffect, useRef, useState } from 'react';
import searchIcon from '../../../shared/assets/search-icon.svg';
import cls from './SearchPlacesForm.module.scss';

interface SearchPlacesProps {
  searchValue: string;
  setValueHandler: (value: string) => void;
}

export const SearchPlacesForm = ({ searchValue, setValueHandler }: SearchPlacesProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      inputRef.current?.focus();
    }

    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsActive(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
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
    <div className={cls.SearchPlaces}>
      <form action="" autoComplete="off">
        <input
          onChange={(e) => {
            setValueHandler(e.target.value);
          }}
          className={`${cls.searchInput} ${isActive ? cls.active : ''}`}
          ref={inputRef}
          id="search"
          name="search"
          type="text"
          placeholder="Type to search stop by name"
        />
      </form>
      <div
        className={`${cls.searchIcon} ${isActive ? cls.activeInput : ''}`}
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        <img src={searchIcon} alt="Search icon" />
      </div>
    </div>
  );
};
