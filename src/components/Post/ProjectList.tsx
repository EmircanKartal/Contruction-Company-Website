import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import EditProjectModal from "./EditProjectModal"; // Import the modal component
import styles from "./style.module.css";

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

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost:8080/api/projects/${id}`).then(() => {
      setProjects(projects.filter((project) => project.id !== id));
    });
  };

  const handleUpdate = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleUpdateSuccess = () => {
    axios.get("http://localhost:8080/api/projects").then((response) => {
      setProjects(response.data);
    });
  };

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: "#001f3f",
        padding: "20px",
        borderRadius: "15px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <h1 className={styles.addNewHeader} style={{ color: "#01FF70" }}>
          Proje Veritabanı
        </h1>
      </div>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#0056b3" }}>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Başlık
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Tarih
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Konum
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Katalog
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Açıklama
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Tip
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              Firma
            </TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>
              İşlemler
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              style={{ backgroundColor: "#001f3f", color: "white" }}
            >
              <TableCell style={{ color: "white" }}>{project.title}</TableCell>
              <TableCell style={{ color: "white" }}>{project.date}</TableCell>
              <TableCell style={{ color: "white" }}>
                {project.location}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                {project.catalog}
              </TableCell>
              <TableCell style={{ color: "white" }}>
                {project.description}
              </TableCell>
              <TableCell style={{ color: "white" }}>{project.type}</TableCell>
              <TableCell style={{ color: "white" }}>{project.firm}</TableCell>
              <TableCell style={{ color: "white" }}>
                <IconButton
                  onClick={() => handleUpdate(project)}
                  style={{ color: "white" }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(project.id)}
                  style={{ color: "white" }}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedProject && (
        <EditProjectModal
          open={isModalOpen}
          onClose={handleModalClose}
          project={selectedProject}
          onUpdate={handleUpdateSuccess}
        />
      )}
    </TableContainer>
  );
};

export default ProjectList;
