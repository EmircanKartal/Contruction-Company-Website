// MapComponent.tsx
import React, { useRef } from "react";
import styles from "./Contact.module.css";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={mapRef} className={styles.mapContainer}>
      <iframe
        title="Yüz Yapı Ofis Konumu"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3021.9206763358447!2d29.927786111625828!3d40.763769371266484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDQ1JzQ5LjYiTiAyOcKwNTUnNDkuMyJF!5e0!3m2!1sen!2str!4v1715265068980!5m2!1sen!2str"
        width="99.8%"
        height="450"
        style={{ marginTop: 0, marginBottom: 0, color: "transparent" }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};
export default MapComponent;
