import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PhotoSlider from "../Slider/Slider";
import styles from "./style.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === "yuzyapi" && password === "6161") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/add");
    } else {
      alert("Kullanıcı adı ve şifrenizi kontrol edin!");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin(); // Call handleLogin when Enter key is pressed
    }
  };

  const slides = [
    { image: require("../assets/footage1.png"), text: "image-1" },
    { image: require("../assets/footage2.png"), text: "image-2" },
    { image: require("../assets/footage3.png"), text: "image-3" },
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
              className={styles.input}
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
              className={styles.input}
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
