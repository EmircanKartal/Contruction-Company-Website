import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { GoMail } from "react-icons/go";

import styles from "./Contact.module.css";
import Footer from "../Footer/Footer";
import TopContainer from "../TopContainer/TopContainer";

interface FormState {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  phone: string;
  emailSubject: string;
}

const Contact = () => {
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    message: "",
    email: "",
    phone: "",
    emailSubject: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    console.log("Submitting form", form);

    const currentDateTime = formatDate(new Date()); // Format current date and time

    try {
      const response = await fetch("http://localhost:8080/api/inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: form.firstName,
          Surname: form.lastName,
          Email: form.email,
          Phone: form.phone,
          Message: form.message,
          EmailSubject: form.emailSubject,
          Time: currentDateTime,
        }),
      });

      console.log("Response status", response.status);

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response data", responseData);
        alert("Form başarıyla gönderildi!");
      } else {
        const errorData = await response.json();
        console.error("Error data", errorData);
        alert(`Form gönderilemedi: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Network error", error);
      alert("Formu gönderirken bir hata oluştu.");
    }
  };

  return (
    <div className={styles.contact}>
      <TopContainer />

      <div className={styles.contactInside}>
        <div className={styles.contactContainer}>
          <h1 className={styles.contactHeading} style={{ marginTop: 20 }}>
            YÜZ YAPI İNŞ. LTD. ŞTİ.
          </h1>
          <Box
            className={styles.cardContainer}
            sx={{
              mt: 4,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              flexWrap: "nowrap",
            }}
          >
            <Card
              sx={{
                width: 400,
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#ffd700",
                  color: "#000000",
                  cursor: "pointer",
                },
                fontFamily: "Arial, sans-serif",
              }}
              onClick={() =>
                window.open(
                  "https://maps.google.com?q=Ömerağa, Cumhuriyet Cd. 138-144, 41300 İzmit - Kocaeli/Türkiye"
                )
              }
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <LocationOnIcon sx={{ mr: 1, fontSize: "30px" }} />
                <Typography variant="body1" style={{ fontSize: 18 }}>
                  Ömerağa, Cumhuriyet Cd. 138-144, 41300 İzmit - Kocaeli/Türkiye
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: 400,
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#ffd700",
                  color: "#000000",
                  cursor: "pointer",
                },
                fontFamily: "Arial, sans-serif",
              }}
              onClick={() => (window.location.href = "tel:+905412342486")}
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PhoneIcon sx={{ mr: 1, fontSize: "30px", marginRight: 2 }} />
                <Typography variant="body1" style={{ fontSize: 22 }}>
                  +90 541 234 24 86
                </Typography>
              </CardContent>
            </Card>
            <Card
              sx={{
                width: 400,
                height: 150,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#ffd700",
                  color: "#000000",
                  cursor: "pointer",
                },
                fontFamily: "Arial, sans-serif",
              }}
              onClick={() =>
                (window.location.href = "mailto:iletisim@yuzyapi.com")
              }
            >
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <GoMail style={{ fontSize: "30px", marginRight: 17 }} />
                <Typography variant="body1" style={{ fontSize: 22 }}>
                  iletisim@yuzyapi.com
                </Typography>
              </CardContent>
            </Card>
          </Box>
          <h1 className={styles.contactHeading} style={{ marginTop: 80 }}>
            Bize Ulaşın
          </h1>
          <Typography variant="body1" gutterBottom>
            Projelerimizle ilgili herhangi bir sorunuz varsa aşağıdaki formdan
            bize ulaşabilirsiniz. Size bir tık uzaktayız. En kısa sürede dönüş
            sağlayacağız.
          </Typography>
          <div className={styles.formArea}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    label="Mesaj Konusu"
                    variant="outlined"
                    fullWidth
                    name="emailSubject"
                    value={form.emailSubject}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    label="Mesajınız"
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
      </div>
      <div style={{ marginTop: 80 }}></div>
      <Footer />
    </div>
  );
};

export default Contact;
