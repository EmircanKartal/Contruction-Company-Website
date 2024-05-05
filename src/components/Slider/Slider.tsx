import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css";

type Slide = {
  image: string;
  text: string;
};

type PhotoSliderProps = {
  slides: Slide[];
};

const PhotoSlider: React.FC<PhotoSliderProps> = ({ slides }) => {
  const sliderRef = useRef<any>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titlePosition, setTitlePosition] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    appendDots: (dots: any) => (
      <div>
        <ul style={{ margin: "0" }}> {dots} </ul>
      </div>
    ),
    afterChange: (currentSlide: number) => {
      if (currentSlide === slides.length - 1) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
          }
        }, 100);
      }
    },
  };

  // Scroll listener for animating title
  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const scrollY = window.scrollY;
        const newPosition = Math.min(scrollY / 4, 80); // Limit the left movement
        setTitlePosition(newPosition);
        setOpacity(Math.max(1 - scrollY / 300, 0)); // Adjust fade effect
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageContainer}>
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className={styles.filter}></div>
            </div>
          </div>
        ))}
      </Slider>
      <h1
        className={styles.foregroundText}
        ref={titleRef}
        style={{
          transform: `translateX(-${titlePosition}%)`,
          opacity: opacity,
        }}
      >
        Yüzyıl.
      </h1>
    </div>
  );
};

export default PhotoSlider;
