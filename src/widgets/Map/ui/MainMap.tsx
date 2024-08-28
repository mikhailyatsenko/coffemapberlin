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
  const { filteredPlaces, loading } = usePlaces();
  // const { data, loading, error } = useQuery<PlacesData>(GET_ALL_PLACES);

  if (loading) {
    return <Loader />;
  }

  if (!filteredPlaces) return null;

  const placesGeo: PlacesDataWithGeo =
    {
      type: 'FeatureCollection',
      features: filteredPlaces,
    } || [];

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

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
