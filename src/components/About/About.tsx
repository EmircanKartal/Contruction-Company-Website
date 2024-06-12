import React from "react";
import styles from "./About.module.css";
import Footer from "../Footer/Footer";
import Map from "../Contact/MapComponent";
import Divider from "@mui/material/Divider";
import TopContainer from "../TopContainer/TopContainer";
import { FaUserTie } from "react-icons/fa6";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import { MdOutlineMyLocation } from "react-icons/md";

const About = () => {
  return (
    <div className={styles.about}>
      <TopContainer />
      <div className={styles.contentContainer}>
        <h1 className={styles.foregroundText}>Hakkımızda</h1>
        <div className={styles.gridContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.textWithBackground}>
              <p className={styles.backgroundText} style={{ marginTop: 140 }}>
                Misyon
              </p>
              <p>
                Vizyonumuz ve Misyonumuz Yüz Yapı, her projesinde
                sürdürülebilirlik ilkesini ön planda tutar ve çevreye duyarlı
                inşaat uygulamalarını benimser. Müşteri memnuniyetini esas
                alarak, yüksek kaliteli malzeme kullanımı ve profesyonel
                işçilikle projelerini hayata geçirir. Her bir yapıda estetik,
                konfor ve fonksiyonelliği bir arada sunarak, müşterilerinin
                yaşam kalitesini artırmayı hedefleriz.
              </p>
            </div>
            <Divider sx={{ my: 5 }} />
            <div className={styles.textWithBackground}>
              <p className={styles.backgroundText} style={{ marginTop: 140 }}>
                Vizyon
              </p>
              <p>
                Geçmişten Günümüze Yolculuk Yüz Yapı, köklü bir tecrübe ve
                birikime sahip kurucuları tarafından hayata geçirilmiştir.
                İnşaat sektöründeki uzun yıllara dayanan birikim, kurucuların
                vizyonuyla birleşerek şirketin temelini oluşturmuştur.
                Kuruluşundan bugüne kadar geçen süreçte, Yüz Yapı sadece yapısal
                değil, aynı zamanda toplumsal ve çevresel sorumlulukları da
                gözeterek faaliyet göstermiştir.
              </p>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.contractorSection}>
              <FaUserTie size={50} />
              <p>Adem Bey</p>
            </div>
            <div className={styles.brokerInfo}>
              <div className={styles.infoRow}>
                <BsBuildings size={28} style={{ marginRight: 15 }} />
                <p>YÜZ YAPI İNŞ. LTD. ŞTİ.</p>
              </div>
              <div className={styles.infoRow}>
                <MdOutlineMyLocation size={28} style={{ marginRight: 15 }} />
                <p>Yahya Kaptan Mah Kandıra Yolu Cad. No:18, D:1</p>
              </div>
              <div className={styles.infoRow}>
                <IoLocationOutline size={28} style={{ marginRight: 15 }} />
                <p>İzmit/Kocaeli</p>
              </div>
              <div className={styles.infoRow}>
                <GoMail size={28} style={{ marginRight: 15 }} />
                <p>adembey@contact.com</p>
              </div>
              <div className={styles.infoRow}>
                <MdOutlinePhoneIphone size={35} style={{ marginRight: 7 }} />
                <p>+90 541 354 86 74</p>
              </div>
            </div>
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
