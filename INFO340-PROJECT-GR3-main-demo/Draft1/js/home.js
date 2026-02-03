let map;

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
    building: "Suzallo Library",
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
  }
];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.655, lng: -122.3080 },
    zoom: 16,
  });

  markerData.forEach(data => {
    const marker = new google.maps.Marker({
      position: data.coordinates,
      map: map,
      title: data.building
    });

    const infowindowContent = `
      <div style="font-family: Arial, sans-serif; width: 220px;">
        <img src="${data.image}" alt="Restroom Image" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 8px;">
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px;">${data.building}</div>
        <div style="font-size: 14px; color: gray; margin-bottom: 4px;">${data.location}</div>
        <div style="font-size: 14px; margin-bottom: 8px;">${data.rating}</div>
        <button style="background-color: #7b2d7b; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer;">Comment</button>
      </div>
    `;

    const infowindow = new google.maps.InfoWindow({
      content: infowindowContent
    });

    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });
  });
}
