// HamburgerMenu.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import "./HamburgerMenu.css"; // Add custom styles here

const menuVariants = {
  open: { x: 0 },
  closed: { x: "100%" },
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="hamburger-menu-container">
      <button className="hamburger-icon" onClick={toggleMenu}>
        {isOpen ? <AiOutlineClose size={30} /> : <AiOutlineMenu size={30} />}
      </button>
      <motion.div
        className="menu"
        initial={{ x: "100%" }}
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <nav className="menu-links">
          <a href="/">Ana Sayfa</a>
          <a href="/projects">Projeler</a>
          <a href="/about">Hakkımızda</a>
          <a href="/contact">İletişim</a>
        </nav>
      </motion.div>
    </div>
  );
};

export default HamburgerMenu;
