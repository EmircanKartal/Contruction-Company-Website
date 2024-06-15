import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { AccountCircle, Lock } from "@mui/icons-material";
import axios from "axios";
import { useTheme } from "./ThemeContext"; // Import the theme context
import styles from "./style.module.css";

const AdminCredentials: React.FC = () => {
  const { theme } = useTheme(); // Use the theme context
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchAdminCredentials = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/admin");
        setUsername(response.data.username);
        setPassword(response.data.password);
      } catch (error) {
        console.error("Error fetching admin credentials:", error);
      }
    };

    fetchAdminCredentials();
  }, []);

  const handleSave = async () => {
    try {
      await axios.put("http://localhost:8080/api/admin", {
        username,
        password,
      });
      alert("Admin credentials updated successfully");
    } catch (error) {
      console.error("Error updating admin credentials:", error);
    }
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
    </Box>
  );
};

export default AdminCredentials;
