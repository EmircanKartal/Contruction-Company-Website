import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Projects.module.css";
import Footer from "../Footer/Footer";
import TopContainer from "../TopContainer/TopContainer";
import image1 from "../assets/footage2.jpg";
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
  isCoverPhoto: boolean[];
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/projects");
        console.log("Fetched projects:", response.data);
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
          {projects.map((project) => {
            // Find the cover photo
            const coverPhotoIndex = project.isCoverPhoto.findIndex(
              (isCover) => isCover
            );
            const coverPhoto =
              coverPhotoIndex !== -1 ? project.images[coverPhotoIndex] : null;
            const fallbackPhoto =
              project.images.length > 1 ? project.images[1] : null;

            return (
              <Link
                key={project.id}
                to={`/project/${project.id}`}
                className={styles.projectCard}
              >
                {coverPhoto ? (
                  <img
                    src={`data:image/png;base64,${coverPhoto}`} // Display the cover photo
                    alt={project.title}
                    className={styles.projectImage}
                  />
                ) : fallbackPhoto ? (
                  <img
                    src={`data:image/png;base64,${fallbackPhoto}`} // Display the fallback photo
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
            );
          })}
        </div>
      </div>
      <Footer />
      {/* Scroll-to-Top Button */}
      <ScrollToTopButton />
    </>
  );
};

export default Projects;
