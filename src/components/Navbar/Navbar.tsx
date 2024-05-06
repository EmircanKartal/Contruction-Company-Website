// Navbar.js
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import HamburgerMenu from "./HamburgerMenu";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
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
