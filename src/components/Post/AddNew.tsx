import React, { useState, useCallback, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Box,
  Modal,
  Paper,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useDropzone, Accept } from "react-dropzone";
import PhotoSlider from "../Slider/Slider";
import styles from "./style.module.css";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";
import { LuImagePlus } from "react-icons/lu";

interface Submission {
  id: string;
  data: {
    [key: string]: string;
  };
}

interface FormData {
  heading: string;
  description: string;
  photo: File | null;
  startDate: string;
  firmName: string;
  projectType: string;
  catalogLink: string;
}

const AddNew: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    description: "",
    photo: null,
    startDate: "",
    firmName: "",
    projectType: "",
    catalogLink: "",
  });
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    undefined
  );
  const [openModal, setOpenModal] = useState(false);
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    aspect: 16 / 9,
  });
  const [croppedImageUrl, setCroppedImageUrl] = useState<string | undefined>(
    undefined
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    if (type === "file") {
      const files = (event.target as HTMLInputElement).files;
      if (files && files[0]) {
        setPreviewImage(URL.createObjectURL(files[0]));
        setOpenModal(true);
      } else {
        setPreviewImage(undefined);
      }
      setFormData((prev) => ({
        ...prev,
        [name]: files ? files[0] : null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setPreviewImage(URL.createObjectURL(file));
      setOpenModal(true);
      setFormData({ ...formData, photo: file });
    },
    [formData]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
    } as Accept,
  });

  const handleImageCropped = (crop: Crop) => {
    if (!previewImage || !crop.width || !crop.height) return;
    const image = new Image();
    image.src = previewImage;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            setCroppedImageUrl(url);
          }
        }, "image/jpeg");
      }
    };
  };

  const handleModalClose = (save: boolean) => {
    setOpenModal(false);
    if (save && croppedImageUrl) {
      setPreviewImage(croppedImageUrl);
    } else {
      setCroppedImageUrl(undefined);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className={styles.addNew}>
      <PhotoSlider
        slides={[
          { image: image1, text: "image-1" },
          { image: image2, text: "image-2" },
          { image: image3, text: "image-3" },
        ]}
      />
      <h1 className={styles.addNewHeader}>Yeni Proje</h1>

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
            />

            <TextField
              label="Başlama Tarihi"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              value={formData.startDate}
              onChange={handleChange}
            />
            <TextField
              label="Konum"
              variant="outlined"
              fullWidth
              margin="normal"
              name="firmName"
              value={formData.firmName}
              onChange={handleChange}
            />
            <TextField
              label="Proje Tipi"
              variant="outlined"
              fullWidth
              margin="normal"
              name="projectType"
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
              value={formData.catalogLink}
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
              value={formData.description}
              onChange={handleChange}
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
              padding: 2,
              textAlign: "center",
              backgroundColor: "#f1f1f5",
              border: "dotted",
              borderWidth: "2px",
              borderColor: "#a0a0a3",
              height: 200,
              width: 500,
              marginLeft: 8,
              marginTop: 10,
            }}
          >
            <CardContent>
              <input {...getInputProps()} />
              <LuImagePlus style={{ fontSize: 30, marginTop: 20 }} />
              <p>Dosyaları seçin veya sürükleyin</p>
              {croppedImageUrl ? (
                <img
                  src={croppedImageUrl}
                  alt="Uploaded"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              ) : (
                <p>Önizleme</p>
              )}
            </CardContent>
          </Card>
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ width: "100%", marginTop: "20px" }}
            />
          )}
        </Grid>
      </Grid>
      <Modal open={openModal} onClose={() => handleModalClose(false)}>
        <Paper
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            padding: 20,
          }}
        >
          {previewImage && (
            <ReactCrop
              src={previewImage}
              crop={crop}
              onChange={(newCrop) => setCrop(newCrop)}
              onComplete={handleImageCropped}
            />
          )}
          <Button onClick={() => handleModalClose(true)}>Save</Button>
          <Button onClick={() => handleModalClose(false)}>Cancel</Button>
        </Paper>
      </Modal>
    </div>
  );
};

export default AddNew;
