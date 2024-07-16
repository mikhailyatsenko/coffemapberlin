/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext, useEffect, useRef, useState } from 'react';
import { Map, Source, Layer, Popup, GeolocateControl, NavigationControl } from 'react-map-gl';
import { clusterLayer, clusterCountLayer, unclusteredPointLayer, namesLayer } from '../model/layers/layers';
import type { MapRef, GeoJSONSource, MapLayerMouseEvent, LngLatLike, MapboxGeoJSONFeature } from 'react-map-gl';
import cls from './LoadMap.module.scss';
import { LocationContext } from 'app/providers/LocationProvider/lib/LocationContext';
import { type PlacesDataWithGeo } from 'widgets/Map/ui/MainMap';
import { PlaceCard } from 'features/PlaceCard';
import { type PlaceResponse, type PlaceProperties } from 'shared/types';
import { type Position } from 'geojson';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGV0cmFrb3YiLCJhIjoiY2tuMGRxZXNqMG1xZzJ0cGZvb2h0emN1ayJ9.CsROju7EJW9j76c6bEsyYw';
// 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

interface LoadMapProps {
  placesGeo: PlacesDataWithGeo;
}

export const LoadMap = ({ placesGeo }: LoadMapProps) => {
  console.log('places in LoadMap', placesGeo);

  const mapRef = useRef<MapRef>(null);

  const { location } = useContext(LocationContext);

  type MyMapboxGeoJSONFeature = MapboxGeoJSONFeature & PlaceResponse;

  const [popupData, setPopupData] = useState<{ properties: PlaceProperties; coordinates: Position } | null>(null);

  useEffect(() => {
    if (location) {
      mapRef?.current?.easeTo({
        center: location as LngLatLike,
        zoom: 15,
        duration: 500,
      });
    }
  }, [location]);

  const onClick = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();

    const feature = event.features?.[0] as MyMapboxGeoJSONFeature;
    console.log('click feature', feature.properties);

    if (!feature) {
      setPopupData(null);
      return;
    }

    const {
      properties,
      geometry: { coordinates },
    } = feature;

    console.log(feature);

    switch (feature?.layer?.id) {
      case 'clusters': {
        const clusterId: number = feature.properties?.cluster_id;

        const mapboxSource = mapRef.current!.getSource('places') as GeoJSONSource;

        mapboxSource.getClusterExpansionZoom(clusterId, (err: Error | null, zoom) => {
          if (!err) {
            mapRef?.current?.easeTo({
              center: feature.geometry.coordinates as LngLatLike,
              zoom,
              duration: 500,
            });
          }
        });
        setPopupData(null);
        break;
      }
      case 'unclustered-point':
        if (feature.geometry.type === 'Point') {
          setPopupData(null);
        }
        break;
      case 'place_title':
        if (feature.geometry.type === 'Point') {
          setPopupData({ properties, coordinates });
          console.log('popUpData', popupData);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 52.5182315090094,
          longitude: 13.397000808436752,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[unclusteredPointLayer.id!, clusterLayer.id!, namesLayer.id!]}
        onClick={onClick}
        ref={mapRef}
        onMouseEnter={() => {
          const canvas = mapRef.current?.getCanvas();
          if (canvas) {
            canvas.style.cursor = 'pointer';
          }
        }}
        onMouseLeave={() => {
          const canvas = mapRef.current?.getCanvas();
          if (canvas) {
            canvas.style.cursor = '';
          }
        }}
      >
        <Source id="places" type="geojson" data={placesGeo} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
          <Layer {...namesLayer} />
        </Source>
        {popupData && (
          <Popup
            className={cls.popup}
            closeButton={false}
            closeOnClick={false}
            anchor="top"
            longitude={Number(popupData.coordinates[0])}
            latitude={Number(popupData.coordinates[1])}
            onClose={() => {
              setPopupData(null);
            }}
          >
            <PlaceCard {...popupData} isPopup={true} />
          </Popup>
        )}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
      </Map>
    </>
  );
};
