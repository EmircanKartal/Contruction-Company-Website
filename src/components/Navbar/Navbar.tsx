import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import HamburgerMenu from "./HamburgerMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY || currentScrollY <= 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    const updateScroll = () => {
      handleScroll();
    };

    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`${styles.navbar} ${!visible ? styles.hide : ""}`}>
      <div className={styles.logo}>Logo</div>
      <HamburgerMenu />
      <div
        className={`${styles.navLinks} ${isOpen ? styles.show : styles.hide}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Projeler
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Hakkımızda
        </NavLink>
        <NavLink
          to="/contact"
          className={`${styles.navLink} ${styles.contactButton}`}
        >
          İletişim
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
