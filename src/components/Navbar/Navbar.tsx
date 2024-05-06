// Navbar.js
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";
import { useState, useEffect } from "react";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setShow(false); // Hides the navbar
      } else {
        setShow(true); // Shows the navbar
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`${styles.navbar} ${show ? "" : styles.hidden}`}>
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
