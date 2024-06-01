import { useRef, useState } from 'react';
import { Map, Source, Layer, Popup } from 'react-map-gl';

import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from '../model/layers/layers';

import type { MapRef, GeoJSONSource, MapLayerMouseEvent, LngLatLike } from 'react-map-gl';

import places from '../../../../places.json';
const typedPlaces: GeoJSON.FeatureCollection<GeoJSON.Geometry> = places as GeoJSON.FeatureCollection<GeoJSON.Geometry>;

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGV0cmFrb3YiLCJhIjoiY2tuMGRxZXNqMG1xZzJ0cGZvb2h0emN1ayJ9.CsROju7EJW9j76c6bEsyYw';
// 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

export const LoadMap = () => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<GeoJSON.Feature | null>(null);

  const onClick = (event: MapLayerMouseEvent) => {
    event.originalEvent.stopPropagation();

    const feature = event.features?.[0];

    if (!feature) {
      setPopupInfo(null);
      return;
    }

    switch (feature.layer.id) {
      case 'clusters': {
        const clusterId: number = feature.properties?.cluster_id;

        const mapboxSource = mapRef.current!.getSource('earthquakes') as GeoJSONSource;
        mapboxSource.getClusterExpansionZoom(clusterId, (err: Error | null, zoom) => {
          if (!err) {
            mapRef?.current?.easeTo({
              center: (feature.geometry as GeoJSON.Point).coordinates as LngLatLike,
              zoom,
              duration: 500,
            });
          }
        });
        setPopupInfo(null);
        break;
      }
      case 'unclustered-point':
        if (feature.geometry.type === 'Point') {
          setPopupInfo(feature);
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
        interactiveLayerIds={[unclusteredPointLayer.id!, clusterLayer.id!]}
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
        <Source
          id="earthquakes"
          type="geojson"
          data={typedPlaces}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        {popupInfo && (
          <Popup
            closeOnClick={false}
            anchor="top"
            longitude={Number((popupInfo.geometry as GeoJSON.Point).coordinates[0])}
            latitude={Number((popupInfo.geometry as GeoJSON.Point).coordinates[1])}
            onClose={() => {
              setPopupInfo(null);
            }}
          >
            <div className="place">
              <div>
                <img src={popupInfo?.properties?.image} alt="" className="thumb" />
              </div>
              <div>
                <a href={popupInfo?.properties?.instagram} target="_blank" rel="noreferrer">
                  <h3>
                    {popupInfo?.properties?.name}
                    <img src="/images/instagram.svg" alt="" className="inst" />
                  </h3>
                </a>
                <p>{popupInfo?.properties?.description}</p>
                <p className="adress">{popupInfo?.properties?.adress}</p>
              </div>
              <div
                className="close"
                onClick={() => {
                  setPopupInfo(null);
                }}
              ></div>
            </div>
          </Popup>
        )}
      </Map>
    </>
  );
};
