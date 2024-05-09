// Contact.jsx
import React from "react";
import styles from "./Contact.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// Add your map implementation here import MapComponent from "./MapComponent"; <MapComponent />
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
const Contact = () => {
  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];
  return (
    <div className={styles.contact}>
      <PhotoSlider slides={slides} />

      <h1 className={styles.heading}>İletişim</h1>
      <div className={styles.info}>
        <a href="tel:+902324633923">
          <FontAwesomeIcon icon={faPhone} /> +90 232 463 39 23
        </a>
        <a href="mailto:info@yeniyuzyil.com">
          <FontAwesomeIcon icon={faEnvelope} /> info@yuzyapi.com
        </a>
      </div>
      <div className={styles.mapContainer}></div>
      <Footer />
    </div>
  );
};

export default Contact;
