import { PlacesList } from 'features/PlacesList';
import { MainMap } from 'widgets/Map';

export const MainPage = () => {
  return (
    <>
      <MainMap />
      <PlacesList />
    </>
  );
};
