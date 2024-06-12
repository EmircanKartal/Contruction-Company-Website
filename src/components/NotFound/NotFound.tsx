// src/components/NotFound/NotFound.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box } from "@mui/material";
import styles from "./NotFound.module.css";
import { BiArrowBack } from "react-icons/bi";

// Directly require the image
const NotFoundImage = require("../assets/404notfoundpage.png");

const NotFound = () => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate("/");
  };

  return (
    <div className={styles.notFoundContainer}>
      <img
        src={NotFoundImage}
        alt="Not Found"
        className={styles.notFoundImage}
      />

      <button className="back-button" onClick={() => navigate("/")}>
        <BiArrowBack size={24} style={{ marginRight: 25 }} /> Ana Sayfa
      </button>
    </div>
  );
};

export default NotFound;
