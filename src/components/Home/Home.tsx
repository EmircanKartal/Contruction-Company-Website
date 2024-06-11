import React from "react";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import Hero from "../assets/Hero.jpg";
import logo from "../assets/logo.png";
import footage1 from "../assets/mainHouse.png";
import footage2 from "../assets/footage2.png";
import footage3 from "../assets/footage4.png";
import footage4 from "../assets/footage6.png";
import footage5 from "../assets/footage5.png";

const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section with Yüzyapı Text */}
      <div className={styles.heroContainer}>
        <div className={styles.textContainer}>
          <img src={logo} alt="logo" className={styles.logo} />
          <div>
            <h1 className={styles.dots}>..</h1>
            <h1 className={styles.yuzYapi}>YUZ</h1>
            <h1 className={styles.yuzYapi}>YAPI</h1>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img src={Hero} alt="Hero" className={styles.heroImage} />
        </div>
      </div>

      {/* Tepe Loft Sneak Peek Section */}
      <div className={styles.sneakPeek}>
        <h2 className={styles.tepeLoftSneakPeekHeader}>Tepe Loft</h2>
        <div className={styles.sneakPeekGrid}>
          <img
            src={footage5}
            alt="Sneak Peak Tepe Loft"
            className={styles.sneakPeekImage}
          />
          <div>
            <p>
              İlk olarak endüstriyel yapıların yaşam alanlarına dönüşümü ile
              karşımıza çıkan Loft Daireleri sizler için yeniden inşa ettik.
            </p>
            <p>
              Estetik, konfor ve güvenin aynı yerde kesiştiği bu yaşam alanında,
              beklentilerinizin karşılığını bulacaksınız.
            </p>
            <Link to="/project/2" className={styles.detailsLink}>
              Detaylar
            </Link>
          </div>
        </div>
      </div>

      {/* Loft Specs Section */}
      <div className={styles.loftSpecs}>
        <div className={styles.loftSpec}>
          <img src={footage1} alt="Bahçe ve Çatı Dubleks" />
          <p className={styles.firstLine}>14 DAİRE - BAHÇE VE ÇATI DUBLEKS</p>
          <p className={styles.secondLine}>
            2+1 | 3+1 | 4+1 ve Loft Daire Seçenekleri
          </p>
        </div>
        <div className={styles.loftSpec}>
          <img src={footage2} alt="Açık ve Kapalı Otopark" />
          <p className={styles.firstLine}>AÇIK VE KAPALI OTOPARK</p>
          <p className={styles.secondLine}>400 m² Kapalı Alan</p>
        </div>
        <div className={styles.loftSpec}>
          <img src={footage3} alt="Yüzme Havuzu" />
          <p className={styles.firstLine}>YÜZME HAVUZU</p>
          <p className={styles.secondLine}>280 m² Açık Sosyal Alan</p>
        </div>
        <div className={styles.loftSpec}>
          <img src={footage4} alt="Depreme Dayanıklı Kademeli Temel" />
          <p className={styles.firstLine}>DEPREME DAYANIKLI KADEMELİ TEMEL</p>
          <p className={styles.secondLine}>
            Cm²’de 300 kg Yüke Dayanımlı Beton
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className={styles.footerContainer}>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
