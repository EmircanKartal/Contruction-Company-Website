import React, { useRef } from "react";
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

  const settings = {
    dots: true,
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

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings} ref={sliderRef}>
        {slides.map((slide, index) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageContainer}>
              <img src={slide.image} alt={`Slide ${index + 1}`} />
              <div className={styles.filter}></div>
              <div className={styles.textOverlay}>{slide.text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoSlider;
