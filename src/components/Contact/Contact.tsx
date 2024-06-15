import React, { useState, ChangeEvent, FormEvent } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { GoMail } from "react-icons/go";
import Footer from "../Footer/Footer";
import TopContainer from "../TopContainer/TopContainer";
import ScrollToTopButton from "../Home/ScrollToTopButton";
import { MdOutlinePhoneIphone, MdOutlineMyLocation } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { BsBuildings } from "react-icons/bs";
import styles from "./Contact.module.css";

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

    const currentDateTime = formatDate(new Date());

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
            <BsBuildings size={40} style={{ marginRight: 21 }} />
            YÜZ YAPI İNŞ. LTD. ŞTİ.
          </h1>

          <Grid container spacing={2} className={styles.iconTextGrid}>
            <Grid item xs={12} sm={6} md={3} className={styles.iconTextItem}>
              <MdOutlineMyLocation size={28} className={styles.icon} />
              <Typography className={styles.text}>
                Yahya Kaptan Mah Kandıra Yolu Cad. No:18, D:1
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.iconTextItem}>
              <IoLocationOutline size={28} className={styles.icon} />
              <Typography className={styles.text}>İzmit/Kocaeli</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.iconTextItem}>
              <GoMail size={28} className={styles.icon} />
              <Typography className={styles.text}>
                adembey@contact.com
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3} className={styles.iconTextItem}>
              <MdOutlinePhoneIphone size={35} className={styles.icon} />
              <Typography className={styles.text}>+90 541 354 86 74</Typography>
            </Grid>
          </Grid>

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
                <Grid item xs={12}>
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
      <ScrollToTopButton />
    </div>
  );
};

export default Contact;
