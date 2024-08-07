import 'mapbox-gl/dist/mapbox-gl.css';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { LoadMap } from 'features/LoadMap';
import { GET_ALL_PLACES } from 'shared/query/places';
import { type PlaceProperties, type PlaceResponse } from 'shared/types';
import { Loader } from 'shared/ui/Loader';

interface PlacesData {
  places: PlaceResponse[];
}

export interface PlacesDataWithGeo extends GeoJSON.FeatureCollection<GeoJSON.Geometry, PlaceProperties> {
  features: PlaceResponse[];
}

export const MainMap = () => {
  const { data, loading, error } = useQuery<PlacesData>(GET_ALL_PLACES);

  const [placesGeo, setPlacesGeo] = useState<undefined | PlacesDataWithGeo>(undefined);

  useEffect(() => {
    if (data && !loading) {
      setPlacesGeo({
        type: 'FeatureCollection',
        features: data.places,
      });
    }
  }, [data, loading]);

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ width: '100dvw', height: 'calc(100dvh - 60px)' }}>
      {placesGeo && <LoadMap placesGeo={placesGeo} />}
    </div>
  );
};
