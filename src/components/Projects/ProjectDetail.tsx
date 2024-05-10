import React from "react";
import { useParams } from "react-router-dom";
import projectsData from "./projects.json"; // Ensure this path is correct
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
// Define the Project interface with all the properties based on your JSON structure
interface Project {
  id: number; // Changed from string to number to match your JSON data
  title: string;
  image: string;
  description: string;
  date: string;
  location: string;
  catalog: string;
}

const ProjectDetail: React.FC = () => {
  // ProjectDetail.tsx
  const { projectId } = useParams<{ projectId?: string }>();
  const numericProjectId = projectId ? parseInt(projectId) : 0;
  const project = projectsData.find((p) => p.id.toString() === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];

  return (
    <div>
      <PhotoSlider slides={slides} />
      <h1>{project.title}</h1>
      <img src={project.image} alt={project.title} />
      <p>{project.description}</p>
      <p>Start Date: {project.date}</p>
      <p>Location: {project.location}</p>
      <a href={project.catalog} target="_blank" rel="noopener noreferrer">
        View Catalog
      </a>
    </div>
  );
};

export default ProjectDetail;
