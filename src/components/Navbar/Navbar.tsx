import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

type NavLinkStyleProps = { isActive: boolean };

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* Logo placeholder */}
      <div className={styles.logo}>LOGO</div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        <NavLink
          to="/"
          className={({ isActive }: NavLinkStyleProps) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }: NavLinkStyleProps) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Projeler
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }: NavLinkStyleProps) =>
            isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
          }
        >
          Hakkımızda
        </NavLink>
      </div>

      {/* Registration Links placeholder */}
      <div className={styles.registrationLinks}>
        <a href="/contact" className={styles.navLink}>
          İletişim
        </a>
        {/* You can replace this with NavLink if you have corresponding routes */}
      </div>
    </nav>
  );
};

export default Navbar;
