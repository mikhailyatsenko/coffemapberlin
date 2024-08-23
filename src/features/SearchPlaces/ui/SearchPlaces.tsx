import { useEffect, useState } from 'react';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { SearchPlacesForm } from 'entities/SearchPlacesForm';

export const SearchPlaces = () => {
  const { filterPlaces } = usePlaces();
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    if (searchValue) {
      filterPlaces(searchValue);
    } else {
      filterPlaces('');
    }
  }, [searchValue, filterPlaces]);

  const setValueHandler = (value: string) => {
    setSearchValue(value);
  };

  return (
    // <div className={cls.SearchPlaces}>
    //   <form action="" autoComplete="off">
    //     <input
    //       onChange={(e) => {
    //         setSearchValue(e.target.value);
    //       }}
    //       className={`${cls.searchInput} ${isActive ? cls.active : ''}`}
    //       id="search"
    //       name="search"
    //       type="text"
    //       placeholder="Type to search stop by name"
    //     />
    //   </form>
    //   <div
    //     className={cls.searchIcon}
    //     onClick={() => {
    //       setIsActive((prev) => !prev);
    //     }}
    //   >
    //     <img src={searchIcon} alt="Search icon" />
    //   </div>
    // </div>
    <SearchPlacesForm searchValue={searchValue} setValueHandler={setValueHandler} />
  );
};
