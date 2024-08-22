import { useEffect, useState } from 'react';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import searchIcon from '../../../shared/assets/search-icon.svg';
import cls from './SearchPlaces.module.scss';

export const SearchPlaces = () => {
  const { filterPlaces } = usePlaces();
  const [searchValue, setSearchValue] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (searchValue) {
      filterPlaces(searchValue);
    } else {
      filterPlaces('');
    }
  }, [searchValue, filterPlaces]);

  return (
    <div className={cls.SearchPlaces}>
      <form action="" autoComplete="off">
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          className={`${cls.searchInput} ${isActive ? cls.active : ''}`}
          id="search"
          name="search"
          type="text"
          placeholder="Type to search stop by name"
        />
      </form>
      <div
        className={cls.searchIcon}
        onClick={() => {
          setIsActive((prev) => !prev);
        }}
      >
        <img src={searchIcon} alt="Search icon" />
      </div>
    </div>
  );
};
