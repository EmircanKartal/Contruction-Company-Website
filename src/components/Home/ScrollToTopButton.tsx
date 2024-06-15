import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import "./ScrollToTopButton.css"; // Ensure this is imported

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <div className="scroll-button">
        <IoIosArrowUp className="scroll-icon" />
      </div>
    </div>
  );
};

export default ScrollToTopButton;
