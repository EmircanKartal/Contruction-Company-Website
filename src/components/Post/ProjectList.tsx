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
import { useTheme } from "./ThemeContext"; // Make sure to import useTheme if not already

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
  const { theme } = useTheme(); // Use the theme context to determine the current theme
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

  const tableBackgroundColor = theme === "dark" ? "#001f3f" : "#f0f0f0"; // Light gray for light mode
  const textColor = theme === "dark" ? "white" : "black"; // Black text for light mode
  const headerColor = theme === "dark" ? "#0056b3" : "#f0f0f0"; // Light header for light mode

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: tableBackgroundColor,
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
        <h1 className={styles.addNewHeader} style={{ color: textColor }}>
          {" "}
          Proje Veritabanı
        </h1>
      </div>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: headerColor }}>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Başlık
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Tarih
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Konum
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Katalog
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Açıklama
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Tip
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              Firma
            </TableCell>
            <TableCell style={{ color: textColor, fontWeight: "bold" }}>
              İşlemler
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              style={{
                backgroundColor: tableBackgroundColor,
                color: textColor,
              }}
            >
              <TableCell style={{ color: textColor }}>
                {project.title}
              </TableCell>
              <TableCell style={{ color: textColor }}>{project.date}</TableCell>
              <TableCell style={{ color: textColor }}>
                {project.location}
              </TableCell>
              <TableCell style={{ color: textColor }}>
                {project.catalog}
              </TableCell>
              <TableCell style={{ color: textColor }}>
                {project.description}
              </TableCell>
              <TableCell style={{ color: textColor }}>{project.type}</TableCell>
              <TableCell style={{ color: textColor }}>{project.firm}</TableCell>
              <TableCell style={{ color: textColor }}>
                <IconButton
                  onClick={() => handleUpdate(project)}
                  style={{ color: textColor }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(project.id)}
                  style={{ color: textColor }}
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
