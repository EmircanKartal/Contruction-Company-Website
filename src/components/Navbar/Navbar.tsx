import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${styles.navbar} ${show ? "" : styles.hidden}`}>
      <div className={styles.logo}>Yeni Yüzyıl İnşaat</div>
      <button className={styles.hamburger} onClick={toggleMenu}>
        ☰
      </button>
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
