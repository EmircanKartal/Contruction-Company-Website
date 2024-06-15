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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { MdOutlineCancel } from "react-icons/md";
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://localhost:8080/api/projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  const handleDelete = (id: number) => {
    setIsDeleteDialogOpen(true);
    setProjectToDelete(id);
  };

  const confirmDelete = () => {
    if (projectToDelete !== null) {
      axios
        .delete(`http://localhost:8080/api/projects/${projectToDelete}`)
        .then(() => {
          setProjects(
            projects.filter((project) => project.id !== projectToDelete)
          );
          setIsDeleteDialogOpen(false);
          setProjectToDelete(null);
        });
    }
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

  const tableBackgroundColor = theme === "dark" ? "#001f3f" : "#ffffff";
  const textColor = theme === "dark" ? "#ffffff" : "#000000";
  const headerBackgroundColor = theme === "dark" ? "#003366" : "#ffffff";
  const rowBackgroundColor = theme === "dark" ? "#002244" : "#f9f9f9";

  return (
    <TableContainer
      component={Paper}
      style={{
        backgroundColor: tableBackgroundColor,
        padding: "0px",
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
        <h1
          className={styles.addNewHeader}
          style={{ color: textColor, marginTop: 80, fontFamily: "Termina" }}
        >
          Proje Listesi
        </h1>
      </div>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: headerBackgroundColor }}>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Başlık
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Tarih
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Konum
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Katalog
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
                maxWidth: "200px", // Limit max width of the "Açıklama" column
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Açıklama
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Tip
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              Firma
            </TableCell>
            <TableCell
              style={{
                color: textColor,
                fontWeight: "bold",
                padding: "10px",
                textAlign: "center",
                fontFamily: "Montserrat",
              }}
            >
              İşlemler
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projects.map((project) => (
            <TableRow
              key={project.id}
              style={{
                backgroundColor: rowBackgroundColor,
                color: textColor,
              }}
            >
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.title}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.date}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.location}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.catalog}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  maxWidth: "200px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {project.description}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.type}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                {project.firm}
              </TableCell>
              <TableCell
                style={{
                  color: textColor,
                  padding: "10px",
                  textAlign: "center",
                }}
              >
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
      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle style={{ fontFamily: "Montserrat", marginTop: "15px" }}>
          {"Bu projeyi silmek istediğinizden emin misiniz?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{ fontFamily: "Helvetica" }}>
            Çünkü bunu yaparsanız bu proje kalıcı olarak silinecektir.
          </DialogContentText>
        </DialogContent>
        <div style={{ marginBottom: "-10px" }}></div>
        <DialogActions
          style={{
            justifyContent: "center",
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
        >
          <Button
            onClick={() => setIsDeleteDialogOpen(false)}
            style={{
              color: "#0056b3",
              marginRight: 60,
              fontFamily: "Montserrat",
              fontSize: "1.1rem",
            }}
            startIcon={<MdOutlineCancel style={{ fontSize: "1.34rem" }} />}
          >
            Iptal et
          </Button>
          <Button
            onClick={confirmDelete}
            style={{
              color: "#ff0000",
              fontFamily: "Montserrat",
              fontSize: "1.1rem",
            }}
            startIcon={<Delete style={{ fontSize: "1.34rem" }} />}
          >
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default ProjectList;
