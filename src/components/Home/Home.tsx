import React from "react";
import PhotoSlider from "../Slider/Slider";
import styles from "./Home.module.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";

const Home = () => {
  const images = [image1, image2, image3];
  const text = "Yeniyüzyıl İnşaat";

  return (
    <div className={styles.home}>
      {/* Slider at the top */}
      <PhotoSlider images={images} text={text} />

      {/* Text layout below the slider */}
      <div className={styles.mainContent}>
        <h1>Finding perfect real estate deals made easier</h1>
        <div className={styles.highlights}>
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
        </div>
        <div className={styles.description}>
          Get your next home, office and any real estate with us and find the
          best offers available right now.
        </div>
        <div className={styles.customerStats}>
          <div className={styles.statNumber}>2.6k+</div>
          <div className={styles.statDescription}>Satisfied Customers</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

//      <PhotoSlider images={images} text={text} />
