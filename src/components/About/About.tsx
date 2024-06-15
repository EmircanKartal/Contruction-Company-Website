import React from "react";
import styles from "./About.module.css";
import Footer from "../Footer/Footer";
import Map from "../Contact/MapComponent";
import Divider from "@mui/material/Divider";
import TopContainer from "../TopContainer/TopContainer";
import ScrollToTopButton from "../Home/ScrollToTopButton";

const About = () => {
  return (
    <div className={styles.about}>
      <TopContainer />
      <div className={styles.contentContainer}>
        <h1 className={styles.foregroundText}>Hakkımızda</h1>
        <div className={styles.textContainer}>
          <div className={styles.paragraph}>
            <h2 className={styles.backgroundText}>Misyon</h2>
            <p>
              Vizyonumuz ve Misyonumuz Yüz Yapı, her projesinde
              sürdürülebilirlik ilkesini ön planda tutar ve çevreye duyarlı
              inşaat uygulamalarını benimser. Müşteri memnuniyetini esas alarak,
              yüksek kaliteli malzeme kullanımı ve profesyonel işçilikle
              projelerini hayata geçirir. Her bir yapıda estetik, konfor ve
              fonksiyonelliği bir arada sunarak, müşterilerinin yaşam kalitesini
              artırmayı hedefleriz.
            </p>
          </div>
          <Divider sx={{ my: 5 }} />
          <div className={styles.paragraph}>
            <h2 className={styles.backgroundText}>Vizyon</h2>
            <p>
              Geçmişten Günümüze Yolculuk Yüz Yapı, köklü bir tecrübe ve
              birikime sahip kurucuları tarafından hayata geçirilmiştir. İnşaat
              sektöründeki uzun yıllara dayanan birikim, kurucuların vizyonuyla
              birleşerek şirketin temelini oluşturmuştur. Kuruluşundan bugüne
              kadar geçen süreçte, Yüz Yapı sadece yapısal değil, aynı zamanda
              toplumsal ve çevresel sorumlulukları da gözeterek faaliyet
              göstermiştir.
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
      <ScrollToTopButton />
    </div>
  );
};

export default About;
