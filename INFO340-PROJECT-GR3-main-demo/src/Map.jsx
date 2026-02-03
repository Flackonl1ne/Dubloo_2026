import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import { useNavigate } from 'react-router';
import './index.css';

// This part of code using AI to help me find the lattitude and longtitude of each lcoations"
const center = {
  lat: 47.655,
  lng: -122.308
};

const markerData = [
  {
    building: "Mary Gates Hall",
    location: "Basement Restroom",
    rating: "⭐⭐⭐⭐⭐ (4.7/5)",
    image: "img/marygates.jpeg",
    coordinates: { lat: 47.6538, lng: -122.3078 }
  },
  {
    building: "Odegaard Library",
    location: "1st Floor",
    rating: "⭐⭐⭐⭐☆ (4.6/5)",
    image: "img/ode.jpeg",
    coordinates: { lat: 47.6562, lng: -122.3094 }
  },
  {
    building: "Suzzallo Library",
    location: "Basement",
    rating: "⭐⭐⭐⭐☆ (4.5/5)",
    image: "img/suzzalo.jpeg",
    coordinates: { lat: 47.6539, lng: -122.3076 }
  },
  {
    building: "Kane Hall",
    location: "3rd Floor",
    rating: "⭐⭐⭐⭐☆ (4.5/5)",
    image: "img/kane hall.jpeg",
    coordinates: { lat: 47.6565, lng: -122.3095 }
  },
  {
    building: "Savery Hall",
    location: "Ground Floor",
    rating: "⭐⭐⭐☆ (4.2/5)",
    image: "img/sav.jpeg",
    coordinates: { lat: 47.6560, lng: -122.3090 }
  },
  {
  building: "Paul G. Allen Center for Computer Science & Engineering",
  location: "2nd Floor",
  rating: "⭐⭐⭐⭐⭐ (4.8/5)",
  image: "img/allen.jpeg",
  coordinates: { lat: 47.6533, lng: -122.3059 }
},
{
  building: "Denny Hall",
  location: "Basement",
  rating: "⭐⭐⭐☆ (3.8/5)",
  image: "img/denny.jpeg",
  coordinates: { lat: 47.6581, lng: -122.3103 }
},
{
  building: "Bagley Hall",
  location: "1st Floor Restroom",
  rating: "⭐⭐⭐☆ (4.2/5)",
  image: "img/bagley.jpeg",
  coordinates: { lat: 47.6548, lng: -122.3087 }
},
{
  building: "Paccar Hall",
  location: "Main Floor Restroom",
  rating: "⭐⭐⭐⭐☆ (4.6/5)",
  image: "img/paccar.jpeg",
  coordinates: { lat: 47.6592, lng: -122.3080 }
},
{
  building: "HUB",
  location: "Ground Floor Restroom",
  rating: "⭐⭐⭐⭐ (4.0/5)",
  image: "img/hub.jpeg",
  coordinates: { lat: 47.6556, lng: -122.3049 }
}
];

// I used AI to clarify how to Dynamically render markers on a map using a dataset and Handle marker click events to show detail cards for the following function
function MapComponent() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  function handleMarkerClick(data) {
    setSelected(data);
  }

  function handleCommentClick() {
    if (selected) {
      navigate(`/dashboard/${encodeURIComponent(selected.building)}`);
    }
  }

  const markers = markerData.map((data, i) => (
    <Marker
      key={i}
      position={data.coordinates}
      title={data.building}
      onClick={() => handleMarkerClick(data)}
    />
  ));

  return (
    <GoogleMap
      mapContainerClassName="map-google-container"
      center={center}
      zoom={16}
    >
      {markers}
      {selected && (
        <InfoWindow
          position={selected.coordinates}
          onCloseClick={() => setSelected(null)}
        >
          <div className="map-info-window">
            <img
              src={selected.image}
              alt="Restroom"
              className="map-info-image"
            />
            <div className="map-info-title">{selected.building}</div>
            <div className="map-info-location">{selected.location}</div>
            <div className="map-info-rating">{selected.rating}</div>
            <button
              onClick={handleCommentClick}
              className="map-comment-button"
            >
              Comment
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapComponent;