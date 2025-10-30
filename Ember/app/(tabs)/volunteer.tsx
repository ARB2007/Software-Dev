import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = { lat: 37.841157, lng: -122.551679 };

export default function Volunteer() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyBpzfgckoo0yerlIRIaR5RxJGmiC69bstE">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}