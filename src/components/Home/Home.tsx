// Home.tsx
import React, { useState } from "react";
import PhotoSlider from "../Slider/Slider";
import ProjectCarousel from "../Home/ProjectCarousel";
import Footer from "../Footer/Footer";
import styles from "./Home.module.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import { Link } from "react-router-dom";
import projectsData from "../Projects/projects.json";

interface Project {
  id: number;
  title: string;
  image: string;
  date?: string;
  location?: string;
  catalog?: string;
}

const Home: React.FC = () => {
  const slides = [
    { image: image1, text: "KALİTE" },
    { image: image2, text: "GÜVEN" },
    { image: image3, text: "YENİLİK" },
  ];

  const [selectedProject, setSelectedProject] = useState<Project>(
    projectsData[0]
  );

  const handleProjectSelect = (project: Project): void => {
    setSelectedProject(project);
  };

  return (
    <div className={styles.home}>
      <PhotoSlider slides={slides} />

      <div className={styles.contentContainer}>
        <div className={styles.backgroundText}>Biz Kimiz?</div>
        <div className={styles.firmInfo}>
          İzmit'te gelişen ve büyüyen yapı sektöründe öncü bir marka olarak 2024
          yılında kurulduk. Kaliteli işçilik, yenilikçi projeler ve müşteri
          memnuniyeti odaklı hizmet anlayışımızla sektörde adımız sıkça söz
          ettirmeye devam ediyoruz.
        </div>
        <div className={styles.aboutLinkContainer}>
          <Link to="/about" className={styles.aboutLink}>
            Hakkımızda <i className="fas fa-angle-right"></i>
          </Link>
        </div>
        <div className={styles.InfoHeader}>Projelerimiz</div>
        <ProjectCarousel
          projects={projectsData}
          selectedProject={selectedProject}
          onSelect={handleProjectSelect}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
