import React from "react";
import PhotoSlider from "../Slider/Slider";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
const Home = () => {
  const slides = [
    {
      image: image1,
      text: "KALİTE",
    },
    {
      image: image2,
      text: "GÜVEN",
    },
    {
      image: image3,
      text: "YENİLİK",
    },
  ];

  return (
    <div className={styles.home}>
      <PhotoSlider slides={slides} />

      <div className={styles.contentContainer}>
        <div className={styles.backgroundText}>Biz Kimiz ?</div>
        <h1 className={styles.foregroundText}>Yeniyüzyıl.</h1>
        <div className={styles.firmInfo}>
          İzmit'te gelişen ve büyüyen yapı sektöründe öncü bir marka olarak 2024
          yılında kurulduk. Kaliteli işçilik, yenilikçi projeler ve müşteri
          memnuniyeti odaklı hizmet anlayışımızla sektörde adımız sıkça söz
          ettirmeye devam ediyoruz.
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
