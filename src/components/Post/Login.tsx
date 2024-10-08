// Login.tsx
import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoSlider from "../Slider/Slider";
import styles from "./style.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Login.tsx in React
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      console.log(response);
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save the token
        navigate("/add");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login error: Network or server issue.");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const slides = [
    { image: require("../assets/footage1.png"), text: "image-1" },
    { image: require("../assets/footage2.jpg"), text: "image-2" },
    { image: require("../assets/footage3.jpg"), text: "image-3" },
  ];

  return (
    <div className={styles.login}>
      <PhotoSlider slides={slides} />
      <div className={styles.loginContainer}>
        <h2 className={styles.headingLogin}>Admin</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              sx={{
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
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div
            className={styles.formGroup}
            style={{ marginTop: 20, marginBottom: 20 }}
          >
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              sx={{
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
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
                "& .MuiFormLabel-root": {
                  color: "white",
                },
                "& .MuiFormLabel-root.Mui-focused": {
                  color: "white",
                },
              }}
              value={password}
              onKeyPress={handleKeyPress}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            className={styles.button}
            onClick={handleLogin}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
