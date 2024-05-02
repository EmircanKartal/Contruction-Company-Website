import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faPhone,
  faEnvelope,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="/">ANASAYFA</a>
          <a href="/projects">PROJELER</a>
          <a href="/about">HAKKIMIZDA</a>
          <a href="/contact">İLETİŞİM</a>
        </div>

        <div className={styles.socialIcons}>
          <a href="https://www.facebook.com">
            <FaFacebook />
          </a>
          <a href="https://www.linkedin.com">
            <FaLinkedin />
          </a>
          <a href="https://www.linkedin.com">
            <FaInstagram />
          </a>
        </div>

        <div className={styles.footerInfo}>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Karabaş, 41040
            İzmit/Kocaeli
          </p>
          <a href="tel:+902324633923">
            <FontAwesomeIcon icon={faPhone} /> +90 232 463 39 23
          </a>
          <a href="mailto:info@notmimarlik.com">
            <FontAwesomeIcon icon={faEnvelope} /> info@yeniyuzyil.com
          </a>
          <div className={styles.coordinates}>
            <p>40°45'49.57"N</p>
            <p>29°55'49.31"E</p>
          </div>
        </div>
      </div>

      <div className={styles.footerCopyright}>
        <p>© 2024 Yeni Yüzyıl İnşaat A.Ş. All rights reserved.</p>
        <p>
          Design by{" "}
          <a
            href="https://www.linkedin.com/in/emircankartal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Emircan Kartal
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
