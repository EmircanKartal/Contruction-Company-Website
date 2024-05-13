import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./HamburgerMenu.css";

const menuVariants = {
  open: { x: 0 },
  closed: { x: "-100%" }, // Assuming you want the menu to slide out to the left
};

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen); // This will toggle the state of isOpen
  const iconStyle = {
    color: "gold",
    fontSize: "35px", // Adjust size as needed
    textShadow: "2px 2px 4px rgba(0, 0, 0, 1)", // This adds a black shadow
  };
  return (
    <div className="hamburger-menu-container">
      <button id="hamburger" className="hamburger-icon" onClick={toggleMenu}>
        {isOpen ? (
          <AiOutlineClose style={iconStyle} />
        ) : (
          <AiOutlineMenu style={iconStyle} />
        )}
      </button>

      <motion.div
        className="menu"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <nav className="menu-links">
          <Link to="/" onClick={toggleMenu}>
            Ana Sayfa
          </Link>
          <Link to="/projects" onClick={toggleMenu}>
            Projeler
          </Link>
          <Link to="/about" onClick={toggleMenu}>
            Hakkımızda
          </Link>
          <Link to="/contact" onClick={toggleMenu}>
            İletişim
          </Link>
        </nav>
      </motion.div>
    </div>
  );
};

export default HamburgerMenu;
