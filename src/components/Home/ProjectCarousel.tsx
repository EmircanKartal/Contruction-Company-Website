import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { GiClick } from "react-icons/gi"; // Click icon
import styles from "./ProjectCarousel.module.css";

interface Project {
  id: string; // Changed from number to string
  title: string;
  image: string;
  date?: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  selectedProject: Project;
  onSelect: (project: Project) => void;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  selectedProject,
  onSelect,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const settings = {
    infinite: true,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
    draggable: true,
    swipe: true,
    swipeToSlide: true,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
  };

  const getSlideClass = (index: number): string => {
    if (index === activeIndex) {
      return styles.activeSlide;
    } else if (index === activeIndex - 1 || index === activeIndex + 1) {
      return styles.neighborSlide;
    }
    return styles.slide;
  };

  const generateProjectLink = (id: string) =>
    `/project/${encodeURIComponent(id)}`;

  useEffect(() => {
    const projectWrapper = document.querySelector(
      `.${styles.projectImageWrapper}`
    ) as HTMLElement;
    if (projectWrapper) {
      projectWrapper.classList.remove(styles.fadeInLeft);
      void projectWrapper.offsetWidth; // Trigger a reflow
      projectWrapper.classList.add(styles.fadeInLeft);
    }
  }, [selectedProject]);

  return (
    <div className={styles.verticalCarouselContainer}>
      <Slider {...settings} className={styles.verticalCarousel}>
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={getSlideClass(index)}
            onClick={() => onSelect(project)}
          >
            <h3>{project.title}</h3>
          </div>
        ))}
      </Slider>
      <Link to={generateProjectLink(selectedProject.id)}>
        <div className={styles.projectImageWrapper}>
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className={styles.projectImage}
          />
          <div className={styles.projectOverlay}>
            <h2 className={styles.projectTitle}>{selectedProject.title}</h2>
            <GiClick className={styles.clickIcon} />
            <p className={styles.projectDate}>
              {selectedProject.date || "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProjectCarousel;
