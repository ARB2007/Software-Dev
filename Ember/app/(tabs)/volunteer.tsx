import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle: React.CSSProperties = {
  width: "100vw",
  height: "100vh",
};

const center: google.maps.LatLngLiteral = { lat: 37.841157, lng: -122.551679 };

const Volunteer: React.FC = () => {
  const apiKey = "AIzaSyBpzfgckoo0yerlIRIaR5RxJGmiC69bstE"; 

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Volunteer;
