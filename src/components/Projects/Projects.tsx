import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import Footer from "../Footer/Footer";
import TopContainer from "../TopContainer/TopContainer";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import { FaArrowRightLong } from "react-icons/fa6";
import axios from "axios";
import ScrollToTopButton from "../Home/ScrollToTopButton";

interface Project {
  id: number;
  title: string;
  date: string;
  location: string;
  catalog: string;
  description: string;
  type: string;
  firm: string;
  images: string[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/projects");
        console.log("Fetched projects:", response.data); // Add this line
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <>
      <div className={styles.projectsContainer}>
        <TopContainer />
        <h1 className={styles.heading}>Projeler</h1>
        <div className={styles.projects}>
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={styles.projectCard}
            >
              {project.images.length > 0 ? (
                <img
                  src={`data:image/png;base64,${project.images[1]}`} // Adjust the image display
                  alt={project.title}
                  className={styles.projectImage}
                />
              ) : (
                <img
                  src={image1}
                  alt="default"
                  className={styles.projectImage}
                />
              )}
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
      {/* Scroll-to-Top Button */}
      <ScrollToTopButton />
    </>
  );
};

export default Projects;
