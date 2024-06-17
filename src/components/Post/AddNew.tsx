import React, { useState, ChangeEvent, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useDropzone, Accept } from "react-dropzone";
import { LuImagePlus } from "react-icons/lu";
import { Close } from "@mui/icons-material";
import { FiCheckCircle } from "react-icons/fi";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { MdExitToApp } from "react-icons/md";
import { Close as CloseIcon } from "@mui/icons-material";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import Sidebar from "./Sidebar";
import ProjectList from "./ProjectList";
import AdminCredentials from "./AdminCredentials";
import ClientInbox from "./ClientInbox";
import { useTheme } from "./ThemeContext";
import styles from "./style.module.css";

interface FormData {
  heading: string;
  description: string;
  photos: { file: File; customPhotoId: number }[];
  startDate: string;
  location: string;
  projectType: string;
  catalogLink: string;
  firmName: string;
}

const AddNew: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const handleCloseError = () => {
    setOpenErrorDialog(false);
  };
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
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [coverPhotoId, setCoverPhotoId] = useState<number | null>(null);
  const [view, setView] = useState("add");
  const handlerQuit = () => {
    localStorage.removeItem("token"); // Clear the token or any other session data
    navigate("/login");
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      if (files) {
        setFormData((prev) => ({
          ...prev,
          photos: [
            ...prev.photos,
            ...Array.from(files).map((file, index) => ({
              file,
              customPhotoId: Date.now() + index,
            })),
          ],
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
      photos: [
        ...prev.photos,
        ...acceptedFiles.map((file, index) => ({
          file,
          customPhotoId: Date.now() + index,
        })),
      ],
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
    formData.photos.forEach((photo) => {
      formDataToSubmit.append("photos", photo.file);
      formDataToSubmit.append("customPhotoIds", photo.customPhotoId.toString()); // Assuming 'customPhotoId' is a unique identifier for each photo
    });
    if (coverPhotoId !== null) {
      // Check if coverPhotoId is not null before appending
      formDataToSubmit.append("coverPhotoId", coverPhotoId.toString());
    }
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
      setOpenSuccessDialog(true);
    } catch (error) {
      console.error("Error adding project:", error);
      setOpenErrorDialog(true);
    }
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
  };

  const showPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? formData.photos.length - 1 : prevIndex - 1
    );
  };

  const showNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === formData.photos.length - 1 ? 0 : prevIndex + 1
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
  }, [isGalleryOpen, formData.photos.length]);

  const handleSetCoverPhoto = (photoId: number) => {
    setCoverPhotoId(photoId);
  };

  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "#001f3f" : "#ffffff";
  const textColor = isDarkMode ? "white" : "black";
  const titleColor = isDarkMode ? "#ffffff" : "#000000";
  const borderColor = theme === "dark" ? "#ffffff" : "#ccc";
  const uploadBackgroundColor = theme === "dark" ? "#003167" : "#f0f0f0";

  const galleryModal = (
    <Modal
      open={isGalleryOpen}
      onClose={closeGallery}
      className="modal-overlay"
    >
      <div className="modal-content">
        {formData.photos[currentImageIndex] ? (
          <img
            src={URL.createObjectURL(formData.photos[currentImageIndex].file)}
            alt={`Gallery view ${currentImageIndex}`}
            className="img"
            style={{
              height: "auto",
              width: "63%",
              padding: "10vh 18vw", // Adjust vh/vw values based on your design needs
            }}
          />
        ) : (
          <div style={{ color: "white" }}>No image selected</div>
        )}
        <IconButton
          onClick={closeGallery}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            color: "white",
            fontSize: "35px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <CloseIcon style={{ fontSize: "43px" }} />
        </IconButton>

        <FaArrowLeft className="arrow left-arrow" onClick={showPreviousImage} />
        <FaArrowRight className="arrow right-arrow" onClick={showNextImage} />
      </div>
    </Modal>
  );

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelect={setView} />

      <div
        style={{
          flex: 1,
          padding: "0 20px 20px 20px", // Padding adjusted for overall spacing
          backgroundColor: backgroundColor,
          minHeight: "100vh",
          color: textColor,
          position: "relative", // For absolute positioning of the logout card
        }}
      >
        {/* Logout Card positioned absolutely at the top right */}
        <Card
          style={{
            position: "absolute",
            top: 855,
            right: 15,
            backgroundColor: "#0057b3d5",
            color: "white",
            cursor: "pointer",
            padding: "2px 10px",
            zIndex: 10,
          }}
          onClick={handlerQuit}
        >
          <CardContent
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <MdExitToApp size={50} style={{ marginRight: 5 }} />
            <Typography
              style={{
                fontSize: 20,
                fontWeight: "bolder",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Çıkış Yap
            </Typography>
          </CardContent>
        </Card>
        {view === "add" && (
          <div
            className={styles.addNew}
            style={{ backgroundColor: backgroundColor, marginTop: 120 }}
          >
            <h1
              className={styles.addNewHeader}
              style={{ color: titleColor, fontFamily: "Termina" }}
            >
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                      style: {
                        color: textColor,
                        borderColor: theme === "dark" ? "#ffffff" : "#000000",
                      },
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
                    id="fileInput"
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
                    textAlign: "center",
                    backgroundColor: uploadBackgroundColor,
                    border: `dotted 2.5px ${borderColor}`,
                    height: 300,
                    width: 600,
                    marginTop: 10,
                  }}
                >
                  <CardContent>
                    <input {...getInputProps()} />
                    <LuImagePlus
                      style={{
                        fontSize: 50,
                        marginTop: 60,
                        color: theme === "dark" ? "#ffffff" : "#000000", // White for dark mode, black for light mode
                      }}
                    />
                    <p
                      style={{
                        color: theme === "dark" ? "#ffffff" : "#000000", // White for dark mode, black for light mode
                        fontSize: 22,
                      }}
                    >
                      Dosyaları seçin veya sürükleyin
                    </p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>

            {/*Photo Organizer*/}
            {/*This modal help the organize uploaded photos*/}
            <Modal
              open={openModal}
              onClose={() => {
                setOpenModal(false);
                setFormData((prev) => ({ ...prev, photos: [] }));
              }}
            >
              <Paper
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "80%",
                  maxHeight: "90vh",
                  overflow: "auto",
                  padding: 20,
                  backgroundColor: backgroundColor,
                }}
              >
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="photos">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fill, minmax(250px, 1fr))",
                          gap: 10,
                        }}
                      >
                        {formData.photos.map((photo, index) => (
                          <Draggable
                            key={photo.customPhotoId}
                            draggableId={`${photo.customPhotoId}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <img
                                  src={URL.createObjectURL(photo.file)}
                                  alt={`Uploaded ${index}`}
                                  style={{ width: "100%", height: "auto" }}
                                  onClick={() => {
                                    setCurrentImageIndex(index);
                                    setIsGalleryOpen(true);
                                  }}
                                />
                                <IconButton
                                  style={{
                                    position: "absolute",
                                    top: 5,
                                    right: 5,
                                    color: "white",
                                    backgroundColor: "#ff0000ba",
                                  }}
                                  onClick={() => handleDeletePhoto(index)}
                                >
                                  <Close />
                                </IconButton>
                                <IconButton
                                  onClick={() =>
                                    handleSetCoverPhoto(photo.customPhotoId)
                                  }
                                  style={{
                                    position: "absolute",
                                    top: 5,
                                    left: 5,
                                    color:
                                      coverPhotoId === photo.customPhotoId
                                        ? "gold"
                                        : "grey",
                                    backgroundColor:
                                      coverPhotoId === photo.customPhotoId
                                        ? "#ffffff"
                                        : "#ffffffba", // Change background dynamically
                                    borderRadius: "50%",
                                    padding: "5px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    boxShadow:
                                      coverPhotoId === photo.customPhotoId
                                        ? "0 0 8px 2px gold, 0px 2px 4px rgba(0,0,0,0.25)" // Glowing effect when selected
                                        : "0px 2px 4px rgba(0,0,0,0.25)",
                                    transition: "all 0.3s ease-in-out", // Smooth transition for color and shadow changes
                                  }}
                                >
                                  <FiCheckCircle />
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
        {view === "clientInbox" && <ClientInbox />}
        {galleryModal}
        {/* Success Dialog */}
        <Dialog
          open={openSuccessDialog}
          onClose={() => setOpenSuccessDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              width: "fit-content",
              maxWidth: "400px",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
            }}
          >
            <Box display="flex" alignItems="center">
              <FiCheckCircle
                size={44}
                color="green"
                style={{ marginRight: 8 }}
              />
              <Typography
                variant="h6"
                component="span"
                style={{ fontFamily: "Termina", color: "green" }}
              >
                Added Successfully
              </Typography>
            </Box>
            <IconButton
              onClick={() => setOpenSuccessDialog(false)}
              color="default"
              edge="end"
              style={{ marginLeft: 10 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText>
              Yeni proje başarıyla veritabanına eklendi.
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* Error Dialog */}
        <Dialog
          open={openErrorDialog}
          onClose={handleCloseError}
          aria-labelledby="error-dialog-title"
          aria-describedby="error-dialog-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "fit-content",
              maxWidth: "400px",
            },
          }}
        >
          <DialogTitle
            id="error-dialog-title"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              color="error"
              style={{ fontFamily: "Termina", fontSize: 30 }}
            >
              Adding Error
            </Typography>
            <IconButton onClick={handleCloseError} color="inherit">
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <DialogContentText id="error-dialog-description">
              Projeniz eklenirken bir sorun oluştu. Lütfen tekrar deneyin.
            </DialogContentText>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNew;
