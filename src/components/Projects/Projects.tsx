import React from "react";
import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import projectsData from "./projects.json";
import { FaArrowRightLong } from "react-icons/fa6";

const Projects = () => {
  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];

  return (
    <>
      <div>
        <PhotoSlider slides={slides} />
        <h1 className={styles.heading}>Projeler</h1>
        <div className={styles.projects}>
          {projectsData.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={styles.projectCard}
            >
              <img
                src={project.image}
                alt={project.title}
                className={styles.projectImage}
              />
              <div className={styles.overlay}>
                <span className={styles.projectTitle}>{project.title}</span>
                <span className={styles.readMore}>
                  Detaylı Bilgi <FaArrowRightLong style={{ marginLeft: 4 }} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
