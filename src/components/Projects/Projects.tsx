import React from "react";
import styles from "./Projects.module.css";
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";

// Import the project data from the JSON file
import projectsData from "./projects.json";

const Projects = () => {
  const slides = [
    { image: image1, text: "KALİTE" },
    { image: image2, text: "GÜVEN" },
    { image: image3, text: "YENİLİK" },
  ];

  return (
    <>
      <div>
        <PhotoSlider slides={slides} />
        <h1 className={styles.heading}>Projeler</h1>
        <div className={styles.projects}>
          {projectsData.map((project) => (
            <a
              key={project.id}
              href={`/${project.title.toLowerCase().replace(" ", "-")}`}
              className={styles.projectCard}
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
              />
              <div className={styles.overlay}>
                <span className={styles.projectTitle}>{project.title}</span>
                <span className={styles.readMore}>Detaylı Bilgi →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
