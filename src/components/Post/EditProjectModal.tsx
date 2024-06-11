import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import axios from "axios";

interface EditProjectModalProps {
  open: boolean;
  onClose: () => void;
  project: any;
  onUpdate: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  open,
  onClose,
  project,
  onUpdate,
}) => {
  const [formData, setFormData] = useState({ ...project });
  const [files, setFiles] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = () => {
    const data = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        data.append(key, formData[key]);
      }
    }
    files.forEach((file) => {
      data.append("photos", file);
    });

    axios
      .put(`http://localhost:8080/api/projects/${project.id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        onUpdate();
        onClose();
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: 400 }}>
        <h2>Projeyi Düzenle</h2>
        <TextField
          name="title"
          label="Başlık"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="date"
          label="Tarih"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="location"
          label="Konum"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="catalog"
          label="Katalog"
          value={formData.catalog}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="description"
          label="Açıklama"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="type"
          label="Tip"
          value={formData.type}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="firm"
          label="Firma"
          value={formData.firm}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <input type="file" multiple onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Kaydet
        </Button>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default EditProjectModal;
