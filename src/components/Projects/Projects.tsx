// Projects.js
import React from "react";
import styles from "./Projects.module.css";
import Footer from "../Footer/Footer"; // Make sure the path is accurate
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
const projectsData = [
  {
    id: 1,
    title: "Project One",
    image:
      "https://img.freepik.com/free-photo/3d-rendering-abstract-building_23-2150896894.jpg",
  },
  {
    id: 2,
    title: "Project Two",
    image:
      "https://img.freepik.com/premium-photo/timeless-classic-modern-residential-building-exterior-with-white-background-generative-ai_911330-1142.jpg",
  },
  {
    id: 3,
    title: "Project Three",
    image:
      "https://img.freepik.com/premium-photo/model-building-with-orange-white-bricks_910054-4465.jpg",
  },
  {
    id: 4,
    title: "Project Four",
    image:
      "https://img.freepik.com/premium-photo/3d-building-model_677801-637.jpg",
  },
  {
    id: 5,
    title: "Project Five",
    image:
      "https://img.freepik.com/premium-photo/3d-building-model_677801-642.jpg",
  },
  {
    id: 6,
    title: "Project Six",
    image:
      "https://img.freepik.com/premium-photo/photo-modern-corporate-architecture-can-be-seen-cityscape-office-buildings_812426-26359.jpg",
  },
];

const Projects = () => {
  const slides = [
    { image: image1, text: "KALİTE" },
    { image: image2, text: "GÜVEN" },
    { image: image3, text: "YENİLİK" },
  ];
  return (
    <>
      <div>
        {/* Photo Slider <PhotoSlider images={images} text={text} />*/}
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
