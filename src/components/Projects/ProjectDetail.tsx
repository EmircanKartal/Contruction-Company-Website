import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProjectDetail.css";
import axios from "axios";
import Footer from "../Footer/Footer";
import NotFound from "../assets/404notfound.png";
import { BiArrowBack } from "react-icons/bi"; // Importing react icon
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TopContainer from "../TopContainer/TopContainer";
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

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/projects/${projectId}`
          );
          setProject(response.data);
        } catch (error) {
          console.error("Error fetching project:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProject();
  }, [projectId]);

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? project!.images.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === project!.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isGalleryOpen) {
        if (event.key === "ArrowLeft") {
          showPreviousImage();
        } else if (event.key === "ArrowRight") {
          showNextImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isGalleryOpen]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="not-found-container">
        <img src={NotFound} alt="Not Found" className="not-found-image" />
        <button className="back-button" onClick={() => navigate("/projects")}>
          <BiArrowBack size={24} style={{ marginRight: 20 }} /> Projeler
        </button>
      </div>
    );
  }

  return (
    <div className="project-details">
      <TopContainer />

      <h1 className="project-title">{project.title}</h1>
      <div className="project-info">
        <div className="info-row">
          <div className="info-block">
            <span className="info-title">BAŞLAMA TARİHİ</span>
            <span className="info-value">{project.date}</span>
          </div>
          <div className="info-block">
            <span className="info-title">KONUM</span>
            <span className="info-value">{project.location}</span>
          </div>
          <div className="info-block">
            <span className="info-title">PROJE TİPİ</span>
            <span className="info-value">{project.type}</span>
          </div>
          <div className="info-block">
            <span className="info-title">ONLINE KATALOG</span>
            <a
              className="info-value"
              href={project.catalog}
              target="_blank"
              rel="noopener noreferrer"
            >
              Kataloğu Görüntüle
            </a>
          </div>
        </div>
        <p className="project-description">{project.description}</p>
      </div>

      <div className="photo-gallery">
        {project.images.map((img, index) => (
          <img
            key={index}
            src={`data:image/png;base64,${img}`}
            alt={project.title}
            className="gallery-image"
            onClick={() => openGallery(index)}
          />
        ))}
      </div>

      {isGalleryOpen && (
        <div className="lightbox">
          <span className="close" onClick={closeGallery}>
            &times;
          </span>
          <img
            src={`data:image/png;base64,${project.images[currentImageIndex]}`}
            alt="Gallery Image"
            className="lightbox-image"
          />
          <FaArrowLeft
            className="arrow left-arrow"
            onClick={showPreviousImage}
          />
          <FaArrowRight className="arrow right-arrow" onClick={showNextImage} />
        </div>
      )}

      <div style={{ marginBottom: 80 }}></div>

      <Footer />
      {/* Scroll-to-Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

export default ProjectDetail;
