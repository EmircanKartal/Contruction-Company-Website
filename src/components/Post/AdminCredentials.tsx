import React, { useState, useEffect, FC } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle, Lock, Close } from "@mui/icons-material";
import { FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import { useTheme } from "./ThemeContext";
import styles from "./style.module.css";
import { PiClockCountdown } from "react-icons/pi";

// Type definition for the token payload
interface TokenPayload {
  exp?: number;
}

const decodeToken = (token: string): TokenPayload | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    console.error("Failed to decode token:", e);
    return null;
  }
};

const AdminCredentials: FC = () => {
  const { theme } = useTheme();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [timer, setTimer] = useState<string>("00:00");
  const [openDialog, setOpenDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp) {
        const updateTimer = () => {
          const now = Math.floor(Date.now() / 1000);
          const timeLeft = decoded.exp ? decoded.exp - now : null;
          if (timeLeft && timeLeft >= 0) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            setTimer(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
          } else {
            clearInterval(countdownFunc);
            setTimer("00:00");
            setOpenDialog(true);
          }
        };

        const countdownFunc = setInterval(updateTimer, 1000);
        updateTimer();

        return () => clearInterval(countdownFunc);
      }
    }
  }, []);

  const handleClose = () => {
    setOpenDialog(false);
    navigate("/login");
  };

  useEffect(() => {
    const fetchAdminCredentials = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin");
        setUsername(response.data.username);
        setPassword(response.data.password);
        console.log(response.data.username + response.data.password);
      } catch (error) {
        console.error("Error fetching admin credentials:", error);
        setOpenErrorDialog(true);
      }
    };

    fetchAdminCredentials();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.put("http://localhost:8080/api/admin", {
        username,
        password,
      });

      if (response.status === 200) {
        setOpenSuccessDialog(true); // Open the success dialog
      }
    } catch (error) {
      console.error("Error updating admin credentials:", error);
    }
  };
  const handleCloseSuccess = () => {
    setOpenSuccessDialog(false);
  };
  const handleCloseError = () => {
    setOpenErrorDialog(false);
  };
  const isDarkMode = theme === "dark";
  const backgroundColor = isDarkMode ? "#001f3f" : "#ffffff";
  const textColor = isDarkMode ? "white" : "black";
  const cardBackgroundColor = isDarkMode ? "#0056b3" : "#f1f1f5";
  const headerColor = isDarkMode ? "#ffffff" : "#000000";
  return (
    <Box className={styles.adminCredentials}>
      <h1
        className={styles.addNewHeader}
        style={{
          display: "flex",
          justifyContent: "center",
          color: headerColor,
          marginTop: 120,
          marginBottom: 40,
          fontFamily: "Termina",
        }}
      >
        Admin
      </h1>

      <Grid container spacing={2} direction="column" alignItems="center">
        <Grid item xs={12}>
          <Card sx={{ width: 430, backgroundColor: cardBackgroundColor }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <AccountCircle
                sx={{
                  mr: 1,
                  fontSize: "30px",
                  marginRight: 2,
                  color: textColor,
                }}
              />
              <Typography
                variant="body1"
                style={{ fontSize: 22, color: textColor }}
              >
                Mevcut Kullanıcı Adı: {username}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: 430, backgroundColor: cardBackgroundColor }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <Lock
                sx={{
                  mr: 1,
                  fontSize: "30px",
                  marginRight: 2,
                  color: textColor,
                }}
              />
              <Typography
                variant="body1"
                style={{ fontSize: 22, color: textColor }}
              >
                Mevcut Şifre: {password}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ width: 430, backgroundColor: cardBackgroundColor }}>
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <PiClockCountdown
                style={{
                  fontSize: "38px",
                  marginRight: 15,
                  color: textColor,
                }}
              />
              <Typography
                variant="body1"
                style={{ fontSize: 22, color: textColor, textAlign: "center" }}
              >
                Oturum şu süre içinde sona eriyor: {timer}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <TextField
          label="Yeni Kullanıcı Adı"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            maxWidth: 300,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: textColor,
              },
            },
            "& .MuiInputLabel-root": {
              color: textColor,
            },
            "& .MuiInputBase-input": {
              color: textColor,
            },
          }}
        />
        <TextField
          label="Yeni Şifre"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            maxWidth: 300,
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "white",
              },
              "&.Mui-focused fieldset": {
                borderColor: "white",
              },
              "& input": {
                color: textColor,
              },
            },
            "& .MuiInputLabel-root": {
              color: textColor,
            },
            "& .MuiInputBase-input": {
              color: textColor,
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          className={styles.saveButton}
          sx={{
            marginTop: "20px",
            backgroundColor: "#0056b3",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "300px",
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
      </Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle
          style={{ fontFamily: "Montserrat", fontWeight: 600, fontSize: 29 }}
        >
          {"Oturumunuz Sona Ermiştir"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Oturumunuzun süresi dolmuştur. Lütfen tekrar giriş yapınız.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: "#0056b3",
              color: "white",
              fontFamily: "Montserrat",
            }}
          >
            Çıkış Yap
          </Button>
        </DialogActions>
      </Dialog>
      {/* Success Dialog */}
      <Dialog
        open={openSuccessDialog}
        onClose={handleCloseSuccess}
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
            <FiCheckCircle size={44} color="green" style={{ marginRight: 8 }} />
            <Typography
              variant="h6"
              component="span"
              style={{ fontFamily: "Termina", color: "green" }}
            >
              Update Successful
            </Typography>
          </Box>
          <IconButton
            onClick={handleCloseSuccess}
            color="default"
            edge="end"
            style={{ marginLeft: 10 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Kullanıcı adı ve şifre başarıyla güncellendi.
          </DialogContentText>
        </DialogContent>
      </Dialog>
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
            Update Error
          </Typography>
          <IconButton onClick={handleCloseError} color="inherit">
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText id="error-dialog-description">
            Kimlik bilgileriniz güncellenirken bir sorun oluştu. Lütfen tekrar
            deneyin.
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AdminCredentials;
