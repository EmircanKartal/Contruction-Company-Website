// ProjectCarousel.tsx
import React, { useState } from "react";
import Slider from "react-slick";
import styles from "./ProjectCarousel.module.css";

interface Project {
  id: number;
  title: string;
  description?: string;
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
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: true,
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

      <div className={styles.projectDetails}>
        <h2>{selectedProject.title}</h2>
        <p>{selectedProject.description}</p>
      </div>
    </div>
  );
};

export default ProjectCarousel;
