import React from "react";
import PhotoSlider from "../Slider/Slider";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import mainImage from "../assets/mainHouse.png"; // Assuming this image is used elsewhere or needs to be added

const Home = () => {
  const images = [image1, image2, image3];
  const text = "Yeniyüzyıl İnşaat";

  return (
    <div className={styles.home}>
      {/* Photo Slider */}
      <PhotoSlider images={images} text={text} />

      <div className={styles.contentContainer}>
        <div className={styles.statsColumn}>
          <h1>Finding perfect real estate deals made easier</h1>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>250+</div>
              <div className={styles.statDescription}>Properties listed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>17+</div>
              <div className={styles.statDescription}>Brokers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>6+</div>
              <div className={styles.statDescription}>Cities reached</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>2.6k+</div>
              <div className={styles.statDescription}>Satisfied Customers</div>
            </div>
          </div>
        </div>

        <div className={styles.extraContent}>
          Get your next home, office, and any real estate with us and find the
          best offers available right now.
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
