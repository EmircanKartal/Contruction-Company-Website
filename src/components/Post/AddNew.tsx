import React, { useState, ChangeEvent, useCallback } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Paper,
  Grid,
  Card,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { useDropzone, Accept } from "react-dropzone";
import { LuImagePlus } from "react-icons/lu";
import { Close } from "@mui/icons-material";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";
import axios from "axios";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";
import AdminCredentials from "./AdminCredentials";
import { useTheme } from "./ThemeContext"; // Import the theme context
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import styles from "./style.module.css";

interface FormData {
  heading: string;
  description: string;
  photos: File[];
  startDate: string;
  location: string;
  projectType: string;
  catalogLink: string;
  firmName: string;
}

const AddNew: React.FC = () => {
  const { theme } = useTheme(); // Use the theme context
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    photos: [],
    startDate: "",
    location: "",
    projectType: "",
    catalogLink: "",
    firmName: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [view, setView] = useState("add");
  const slides = [
    { image: image1, text: "image-1" },
    { image: image2, text: "image-2" },
    { image: image3, text: "image-3" },
  ];

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        setFormData((prev) => ({
          ...prev,
          photos: Array.from(files),
        }));
        setOpenModal(true);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, ...acceptedFiles],
    }));
    setOpenModal(true);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    } as Accept,
  });

  const handleDeletePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const updatedPhotos = Array.from(formData.photos);
    const [reorderedPhoto] = updatedPhotos.splice(result.source.index, 1);
    updatedPhotos.splice(result.destination.index, 0, reorderedPhoto);
    setFormData((prev) => ({
      ...prev,
      photos: updatedPhotos,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.heading);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("date", formData.startDate);
    formDataToSubmit.append("location", formData.location);
    formDataToSubmit.append("catalog", formData.catalogLink);
    formDataToSubmit.append("type", formData.projectType);
    formDataToSubmit.append("firm", formData.firmName);
    formData.photos.forEach((photo, index) => {
      formDataToSubmit.append("photos", photo);
    });

    try {
      const response = await axios.post(
        "http://localhost:8080/api/projects",
        formDataToSubmit,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Project added successfully:", response.data);
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "#001f3f" : "#ffffff";
  const textColor = isDarkMode ? "white" : "black";
  const titleColor = isDarkMode ? "#01FF70" : "#0056b3";

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setView} />

      <div
        style={{
          flex: 1,
          padding: "20px",
          backgroundColor: backgroundColor,
          minHeight: "100vh",
          color: textColor,
        }}
      >
        {view === "add" && (
          <div
            className={styles.addNew}
            style={{ backgroundColor: backgroundColor, marginTop: 120 }}
          >
            <h1 className={styles.addNewHeader} style={{ color: titleColor }}>
              Yeni Proje
            </h1>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={10} md={4}>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Başlık"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="heading"
                    value={formData.heading}
                    onChange={handleChange}
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                  />
                  <TextField
                    label="Başlama Tarihi"
                    type="date"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="startDate"
                    InputLabelProps={{
                      shrink: true,
                      style: { color: textColor },
                    }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Konum"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="location"
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.location}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Proje Tipi"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="projectType"
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.projectType}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Katalog Link"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="catalogLink"
                    type="url"
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.catalogLink}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Firma Adı"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="firmName"
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.firmName}
                    onChange={handleChange}
                  />
                  <TextField
                    label="Açıklama"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="description"
                    multiline
                    rows={4}
                    InputLabelProps={{ style: { color: textColor } }}
                    InputProps={{
                      style: { color: textColor },
                      classes: { notchedOutline: styles.notchedOutline },
                    }}
                    value={formData.description}
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    name="photos"
                    onChange={handleChange}
                    multiple
                    style={{ display: "none" }}
                    id="photos"
                  />

                  <Button
                    type="submit"
                    sx={{
                      backgroundColor: "#0056b3",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      width: "223px",
                      fontWeight: 400,
                      marginTop: "20px",
                      fontSize: "18px",
                      fontFamily: "'Montserrat', sans-serif",
                      height: "45px",
                      "&:hover": {
                        backgroundColor: "#004080",
                      },
                      "&:active": {
                        backgroundColor: "#003366",
                      },
                    }}
                    fullWidth
                  >
                    Ekle
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={10} md={4}>
                <Card
                  {...getRootProps()}
                  sx={{
                    padding: 6,
                    margin: 6,
                    textAlign: "center",
                    backgroundColor: "#003167",
                    border: "dotted",
                    borderWidth: "2.5px",
                    borderColor: "#d4d4db",
                    height: 200,
                    width: 500,
                    marginTop: 10,
                  }}
                >
                  <CardContent>
                    <input {...getInputProps()} />
                    <LuImagePlus
                      style={{ fontSize: 50, marginTop: 20, color: "#ffffff" }}
                    />
                    <p style={{ color: "#ffffff", fontSize: 22 }}>
                      Dosyaları seçin veya sürükleyin
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <Paper
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 600,
                  padding: 20,
                }}
              >
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="photos">
                    {(provided: DroppableProvided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(3, 1fr)",
                          gap: 10,
                        }}
                      >
                        {formData.photos.map((photo, index) => (
                          <Draggable
                            key={index}
                            draggableId={`${index}`}
                            index={index}
                          >
                            {(provided: DraggableProvided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  position: "relative",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(photo)}
                                  alt={`Uploaded ${index}`}
                                  style={{
                                    width: "100%",
                                    height: "auto",
                                  }}
                                />
                                <IconButton
                                  style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    backgroundColor: "red",
                                    color: "white",
                                  }}
                                  onClick={() => handleDeletePhoto(index)}
                                >
                                  <Close />
                                </IconButton>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                <Button
                  onClick={() => setOpenModal(false)}
                  sx={{
                    marginTop: "20px",
                    backgroundColor: "#0056b3",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    width: "100%",
                    fontWeight: 400,
                    fontSize: "18px",
                    fontFamily: "'Montserrat', sans-serif",
                    height: "45px",
                    "&:hover": {
                      backgroundColor: "#004080",
                    },
                    "&:active": {
                      backgroundColor: "#003366",
                    },
                  }}
                >
                  Kaydet
                </Button>
              </Paper>
            </Modal>
          </div>
        )}
        {view === "list" && <ProjectList />}
        {view === "admin" && <AdminCredentials />}
      </div>
    </div>
  );
};

export default AddNew;
