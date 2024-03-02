import React from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import markerImage from './map-marker-icon-1366x2048-7u371uwd.png'

function MapForAddSell({ latitude, longitude, setLatitude, setLongitude }) {

  const dragFunc = (e) => {

    setLatitude(e.lngLat.lat);

    setLongitude(e.lngLat.lng);
  };

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 14
      }}
      style={{ width: '99%',margin: '0 auto', height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        onDragEnd={dragFunc}
        draggable={true}
        longitude={longitude} latitude={latitude} anchor="bottom" >
        <img height={30} src={markerImage} />
      </Marker>
    </Map>
  );
};

function MapForDetailPage({ latitude, longitude}) {

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYmVuZWhta2UiLCJhIjoiY2plYTl6b3c2MHg5ODJxbGV4aXR4Z3p6YSJ9.d3jSAbsqSmpJwyVcp9iXbw"
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 10
      }}
      style={{ width: '99%', margin:'0 auto', height: '57%' }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        draggable={false}
        longitude={longitude} latitude={latitude} anchor="bottom" >
        <img height={30} src={markerImage} />
      </Marker>
    </Map>
  );
};

export { MapForAddSell, MapForDetailPage };