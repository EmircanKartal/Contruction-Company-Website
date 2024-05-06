// MapComponent.jsx
import React, { useEffect, useRef } from "react";

const MapComponent = () => {
  const mapRef = useRef(null);

  /*useEffect(() => {
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 40.7608, lng: -73.9756 },
      zoom: 12,
    });
  }, []);*/

  return <div style={{ height: "400px", width: "100%" }} ref={mapRef}></div>;
};

export default MapComponent;
