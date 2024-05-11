import { useRef, useState } from 'react';
import { Map, Source, Layer, Popup } from 'react-map-gl';

import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from '../model/layers/layers';

import type { MapRef, GeoJSONSource, MapLayerMouseEvent } from 'react-map-gl';

import places from '../../../../places.json';

interface Place {
  n: number;
  name: string;
  location: [number, number];
  adress: string;
  image: string;
  instagram: string;
  description: string;
  tag: string;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGV0cmFrb3YiLCJhIjoiY2tuMGRxZXNqMG1xZzJ0cGZvb2h0emN1ayJ9.CsROju7EJW9j76c6bEsyYw';
// 'pk.eyJ1IjoibWlraGFpbHlhdHNlbmtvIiwiYSI6ImNsdnFwZ3F5MDBlejMybG52cW54eXZhcmYifQ.K0kaDuoAqNrXBbe2Sc1pzw';

export const LoadMap = () => {
  const mapRef = useRef<MapRef>(null);
  const [popupInfo, setPopupInfo] = useState<Place | null>(null);

  const stores: GeoJSON.FeatureCollection = {
    type: 'FeatureCollection',
    features: [],
  };

  places.forEach(function (place) {
    stores.features.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [place.location[1], place.location[0]],
      },
      properties: {
        name: place.name,
        address: place.adress,
        n: place.n,
      },
    });
  });

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
        console.log(clusterId);

        const mapboxSource = mapRef.current!.getSource('earthquakes') as GeoJSONSource;
        mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (!err) {
            console.log((feature.geometry as GeoJSON.Point).coordinates);
            mapRef?.current?.easeTo({
              center: feature.geometry.coordinates,
              zoom,
              duration: 500,
            });
          }
        });
        setPopupInfo(null);
        break;
      }
      case 'unclustered-point':
        setPopupInfo(places[feature?.properties?.n]);
        // console.log(feature.properties.n)
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 59.942815,
          longitude: 30.328317,
          zoom: 12,
        }}
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={[unclusteredPointLayer.id, clusterLayer.id]}
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
        <Source id="earthquakes" type="geojson" data={stores} cluster={true} clusterMaxZoom={14} clusterRadius={50}>
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        {popupInfo && (
          <Popup
            closeOnClick={false}
            anchor="top"
            longitude={Number(popupInfo.location[1])}
            latitude={Number(popupInfo.location[0])}
            onClose={() => {
              console.log('close');
              setPopupInfo(null);
            }}
          >
            <div className="place">
              <div>
                <img src={popupInfo.image} alt="" className="thumb" />
              </div>
              <div>
                <a href={popupInfo.instagram} target="_blank" rel="noreferrer">
                  <h3>
                    {popupInfo.name}
                    <img src="/images/instagram.svg" alt="" className="inst" />
                  </h3>
                </a>
                <p>{popupInfo.description}</p>
                <p className="adress">{popupInfo.adress}</p>
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
