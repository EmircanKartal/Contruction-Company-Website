import React from "react";
import styles from "./About.module.css";
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import Map from "../Contact/MapComponent";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import { FaAlignCenter } from "react-icons/fa";
const About = () => {
  const slides = [
    { image: image1, text: "KALİTE" },
    { image: image2, text: "GÜVEN" },
    { image: image3, text: "YENİLİK" },
  ];
  return (
    <div className={styles.about}>
      <PhotoSlider slides={slides} />
      <div className={styles.contentContainer}>
        <h1 className={styles.foregroundText}>Hakkımızda</h1>
        <div className={styles.firmInfo}>
          <div className={styles.textWithBackground}>
            <p className={styles.backgroundText}>Vizyon</p>
            <p>
              Geçmişten Günümüze Yolculuk Yeniyüzyıl İnşaat, köklü bir tecrübe
              ve birikime sahip kurucuları tarafından hayata geçirilmiştir.
              İnşaat sektöründeki uzun yıllara dayanan birikim, kurucuların
              vizyonuyla birleşerek şirketin temelini oluşturmuştur.
              Kuruluşundan bugüne kadar geçen süreçte, Yeniyüzyıl İnşaat sadece
              yapısal değil, aynı zamanda toplumsal ve çevresel sorumlulukları
              da gözeterek faaliyet göstermiştir.
            </p>
          </div>
          <div className={styles.textWithBackground}>
            <p className={styles.backgroundText}>Misyon</p>
            <p>
              Vizyonumuz ve Misyonumuz Yeniyüzyıl İnşaat, her projesinde
              sürdürülebilirlik ilkesini ön planda tutar ve çevreye duyarlı
              inşaat uygulamalarını benimser. Müşteri memnuniyetini esas alarak,
              yüksek kaliteli malzeme kullanımı ve profesyonel işçilikle
              projelerini hayata geçirir. Her bir yapıda estetik, konfor ve
              fonksiyonelliği bir arada sunarak, müşterilerinin yaşam kalitesini
              artırmayı hedefleriz.
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className={styles.foregroundText} style={{ textAlign: "center" }}>
          Ofisimiz
        </h1>
      </div>
      <Map />
      <Footer />
    </div>
  );
};

export default About;
