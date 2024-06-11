import React from "react";
import styles from "./TopContainer.module.css";
import Img from "../assets/TopContainerImg.png";

const TopContainer: React.FC = () => {
  return (
    <div className={styles.topContainer}>
      <img src={Img} alt="Top Container" className={styles.topImage} />
    </div>
  );
};

export default TopContainer;
