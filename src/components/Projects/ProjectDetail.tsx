import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProjectDetail.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import axios from "axios";

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

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/projects/${projectId}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  if (!project) {
    return <div className="not-found">Proje bulunamadı</div>;
  }

  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];

  return (
    <div className="project-details">
      <PhotoSlider slides={slides} />
      <div className="project-detail-container">
        <h1 className="project-title">{project.title}</h1>
        <div className="project-info">
          <div className="info-block">
            <span className="info-title">BAŞLAMA TARİHİ</span>
            <div className="info-value">{project.date}</div>
          </div>
          <div className="info-block">
            <span className="info-title">KONUM</span>
            <div className="info-value">{project.location}</div>
          </div>
          <div className="info-block">
            <span className="info-title">PROJE TİPİ</span>
            <div className="info-value">{project.type}</div>
          </div>
          <div className="info-block">
            <span className="info-title">ONLINE KATALOG</span>
            <div className="info-value">
              <a
                href={project.catalog}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#666ff" }}
              >
                Kataloğu Görüntüle
              </a>
            </div>
          </div>
        </div>
        <p className="project-description">{project.description}</p>
        {project.images.length > 0 && (
          <img
            src={`data:image/png;base64,${project.images[0]}`} // Adjust the image display
            alt={project.title}
            className="project-image"
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
