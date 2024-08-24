import searchIcon from '../../../shared/assets/search-icon.svg';
import cls from './SearchPlacesInput.module.scss';

interface SearchPlacesProps {
  searchValue: string;
  isActive: boolean;
  setValueHandler: (value: string) => void;
}

export const SearchPlacesInput = ({ searchValue, setValueHandler, isActive }: SearchPlacesProps) => {
  return (
    <>
      <input
        onChange={(e) => {
          setValueHandler(e.target.value);
        }}
        className={`${cls.searchInput} ${isActive ? cls.active : ''}`}
        autoComplete="off"
        id="search"
        name="search"
        type="text"
        placeholder="Type to search stop by name"
      />

      <div className={`${cls.searchIcon} ${isActive ? cls.activeInput : ''}`}>
        <img src={searchIcon} alt="Search icon" />
      </div>
    </>
  );
};
