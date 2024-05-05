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
      <div className={styles.contentContainer}>
        <h1 className={styles.foregroundText}>Yeniyüzyıl İnşaat Hakkında</h1>
        <div className={styles.firmInfo}>
          <p>
            Geçmişten Günümüze Yolculuk Yeniyüzyıl İnşaat, köklü bir tecrübe ve
            birikime sahip kurucuları tarafından hayata geçirilmiştir. İnşaat
            sektöründeki uzun yıllara dayanan birikim, kurucuların vizyonuyla
            birleşerek şirketin temelini oluşturmuştur. Kuruluşundan bugüne
            kadar geçen süreçte, Yeniyüzyıl İnşaat sadece yapısal değil, aynı
            zamanda toplumsal ve çevresel sorumlulukları da gözeterek faaliyet
            göstermiştir.
          </p>
          <p>
            Vizyonumuz ve Misyonumuz Yeniyüzyıl İnşaat, her projesinde
            sürdürülebilirlik ilkesini ön planda tutar ve çevreye duyarlı inşaat
            uygulamalarını benimser. Müşteri memnuniyetini esas alarak, yüksek
            kaliteli malzeme kullanımı ve profesyonel işçilikle projelerini
            hayata geçirir. Her bir yapıda estetik, konfor ve fonksiyonelliği
            bir arada sunarak, müşterilerinin yaşam kalitesini artırmayı
            hedefleriz.
          </p>
        </div>
      </div>
      <div className={styles.footer}>
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
      </div>
      <Footer />
    </div>
  );
};

export default About;
