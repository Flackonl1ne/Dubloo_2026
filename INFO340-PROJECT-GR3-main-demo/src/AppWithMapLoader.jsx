import React from 'react';
import { LoadScript } from '@react-google-maps/api';
import App from './App';

// I used AI to help me with to how to properly load the Google Maps JavaScript API 
// within a React app
export default function AppWithMapLoader() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyA3iXizyArWBcUzJSif9hVrw1hxGdTp3ew">
      <App />
    </LoadScript>
  );
}