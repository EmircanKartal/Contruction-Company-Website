import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Contact.module.css";
import Footer from "../Footer/Footer";
import PhotoSlider from "../Slider/Slider";
import image1 from "../assets/footage1.png";
import image2 from "../assets/footage2.png";
import image3 from "../assets/footage3.png";

interface FormState {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  phone: string;
  topic: string;
}

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    message: "",
    email: "",
    phone: "",
    topic: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className={styles.contact}>
      <PhotoSlider
        slides={[
          { image: image1, text: "image-1" },
          { image: image2, text: "image-2" },
          { image: image3, text: "image-3" },
        ]}
      />
      <div className={styles.contactInside}>
        <div className={styles.contactContainer}>
          <h1 className={styles.contactHeading} style={{ marginTop: -160 }}>
            Bize Ulaşın
          </h1>
          <Typography variant="body1" gutterBottom>
            Projelerimizle ilgili herhangi bir sorunuz varsa aşağıdaki formdan
            bize ulaşabilirsiniz. Size bir tık uzaktayız. En kısa sürede dönüş
            sağlayacağız.
          </Typography>
          <div className={styles.formArea}>
            <form
              className={styles.contactForm}
              action="https://getform.io/f/jbwxeyoa"
              method="POST"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Adınız"
                    variant="outlined"
                    fullWidth
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Soyadınız"
                    variant="outlined"
                    fullWidth
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    label="Telefon"
                    variant="outlined"
                    fullWidth
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Message"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    inputProps={{
                      maxLength: 500,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Gönder
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </div>
        <h1 className={styles.contactHeading} style={{ marginTop: -280 }}>
          YÜZ YAPI İNŞ. LTD. ŞTİ.
        </h1>
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Card
            sx={{
              width: 350,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", // Added to center content horizontally
              "&:hover": {
                backgroundColor: "#0056b3",
                color: "#fff",
                cursor: "pointer",
              },
              fontFamily: "Arial, sans-serif", // More robust font family
            }}
            onClick={() =>
              window.open(
                "https://maps.google.com?q=Ömerağa, Cumhuriyet Cd. 138-144, 41300 İzmit - Kocaeli/Türkiye"
              )
            }
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1, fontSize: "30px" }} />{" "}
              {/* Increased icon size */}
              <Typography variant="body1" style={{ fontSize: 18 }}>
                {" "}
                {/* Increased font size */}
                Ömerağa, Cumhuriyet Cd. 138-144, 41300 İzmit - Kocaeli/Türkiye
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: 350,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "#0056b3",
                color: "#fff",
                cursor: "pointer",
              },
              fontFamily: "Arial, sans-serif",
            }}
            onClick={() => (window.location.href = "tel:+905412342486")}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 1, fontSize: "30px", marginRight: 2 }} />{" "}
              {/* Increased icon size */}
              <Typography variant="body1" style={{ fontSize: 22 }}>
                {" "}
                {/* Increased font size */}
                +90 541 234 24 86
              </Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              width: 350,
              height: 150,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center", // Added to center content horizontally
              "&:hover": {
                backgroundColor: "#0056b3",
                color: "#fff",
                cursor: "pointer",
              },
              fontFamily: "Arial, sans-serif", // More robust font family
            }}
            onClick={() =>
              (window.location.href = "mailto:iletisim@yuzyapi.com")
            }
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1, fontSize: "30px", marginRight: 2 }} />{" "}
              {/* Increased icon size */}
              <Typography variant="body1" style={{ fontSize: 22 }}>
                {" "}
                {/* Increased font size */}
                iletisim@yuzyapi.com
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </div>
      <div style={{ marginTop: 80 }}></div>
      <Footer />
    </div>
  );
};

export default Contact;
