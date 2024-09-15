import 'mapbox-gl/dist/mapbox-gl.css';
import { usePlaces } from 'app/providers/PlacesDataProvider/ui/PlacesDataProvider';
import { LoadMap } from 'features/LoadMap';
import { ShowFavoritesPlaces } from 'features/ShowFavoritesPlaces';
import { type PlaceProperties, type PlaceResponse } from 'shared/types';
import { Loader } from 'shared/ui/Loader';
import { PortalToBody } from 'shared/ui/Portals/PortalToBody';

export interface PlacesDataWithGeo extends GeoJSON.FeatureCollection<GeoJSON.Geometry, PlaceProperties> {
  features: PlaceResponse[];
}

export const MainMap = () => {
  const { filterablePlaces, favoritePlaces, showFavorites, loading } = usePlaces();

  if (loading) {
    return <Loader />;
  }

  if (!filterablePlaces) return null;

  const placesGeo: PlacesDataWithGeo =
    {
      type: 'FeatureCollection',
      features: showFavorites && favoritePlaces?.length ? favoritePlaces : filterablePlaces,
    } || [];

  return (
    <>
      <div style={{ width: '100dvw', height: 'calc(100dvh - 60px)', zIndex: 1 }}>
        {placesGeo && <LoadMap placesGeo={placesGeo} />}
      </div>
      <PortalToBody>
        <ShowFavoritesPlaces />
      </PortalToBody>
    </>
  );
};
