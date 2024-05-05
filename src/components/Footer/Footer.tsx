import React from "react";
import styles from "./Footer.module.css";

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
          <a href="https://www.facebook.com" style={{ color: "#0066ff" }}>
            <FaFacebook size={47} />
          </a>
          <a href="https://www.linkedin.com" style={{ color: "#0066ff" }}>
            <FaLinkedin size={47} />
          </a>
          <a href="https://www.instagram.com" style={{ color: "#0066ff" }}>
            <FaInstagram size={47} />
          </a>
        </div>
      </div>
      <div className={styles.coordinates}>
        <p>40°45'49.57"N</p>
        <p>29°55'49.319"E</p>
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
