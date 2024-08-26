// import searchIcon from '../../../shared/assets/search-icon.svg';
import filtersIcon from '../../../shared/assets/filter-icon.svg';

import cls from './SearchPlacesInput.module.scss';

interface SearchPlacesProps {
  searchValue: string;
  isActive: boolean;
  setValueHandler: (value: string) => void;
}

export const SearchPlacesInput = ({ setValueHandler, isActive, searchValue }: SearchPlacesProps) => {
  return (
    <>
      <input
        onChange={(e) => {
          setValueHandler(e.target.value);
        }}
        value={searchValue}
        className={`${cls.searchInput} ${isActive ? cls.active : ''}`}
        autoComplete="off"
        id="search"
        name="search"
        type="text"
        placeholder="Type to search"
      />

      <div className={`${cls.searchIcon} ${isActive ? cls.activeInput : ''}`}>
        <img src={filtersIcon} alt="Search icon" />
      </div>
    </>
  );
};
