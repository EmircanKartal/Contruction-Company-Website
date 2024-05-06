// Contact.jsx
import React from "react";
import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// Add your map implementation here import MapComponent from "./MapComponent"; <MapComponent />
import Footer from "../Footer/Footer";

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h1 className={styles.heading}>İletişim</h1>
      <div className={styles.info}>
        <a href="tel:+902324633923">
          <FontAwesomeIcon icon={faPhone} /> +90 232 463 39 23
        </a>
        <a href="mailto:info@yeniyuzyil.com">
          <FontAwesomeIcon icon={faEnvelope} /> info@yeniyuzyil.com
        </a>
      </div>
      <div className={styles.mapContainer}></div>
      <Footer />
    </div>
  );
};

export default Contact;
