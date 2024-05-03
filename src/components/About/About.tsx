import React from "react";
import styles from "./About.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.footerInfo}>
        <p>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
          Karabaş, 41040 İzmit/Kocaeli
        </p>
        <a href="tel:+902324633923">
          <FontAwesomeIcon icon={faPhone} />
          +90 232 463 39 23
        </a>
        <a href="mailto:info@notmimarlik.com">
          <FontAwesomeIcon icon={faEnvelope} />
          info@yeniyuzyil.com
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default About;
