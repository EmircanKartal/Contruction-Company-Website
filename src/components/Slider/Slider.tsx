import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.css";

type PhotoSliderProps = {
  images: string[];
  text: string;
};

const PhotoSlider: React.FC<PhotoSliderProps> = ({ images, text }) => {
  const sliderRef = useRef<any>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 10000, // Transition speed in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 20000, // Slide change interval in milliseconds
    appendDots: (dots: any) => (
      <div>
        <ul style={{ margin: "0" }}> {dots} </ul>
      </div>
    ),
    afterChange: (currentSlide: number) => {
      // After each slide change
      if (currentSlide === images.length - 1) {
        // If it's the last slide
        setTimeout(() => {
          // Wait for the animation to finish
          // Go to the first slide (loop)
          if (sliderRef.current) {
            sliderRef.current.slickGoTo(0);
          }
        }, 100); // Adjust the delay as needed
      }
    },
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings} ref={sliderRef}>
        {images.map((image: string, index: number) => (
          <div key={index} className={styles.slide}>
            <div className={styles.imageContainer}>
              <img src={image} alt={`Slide ${index + 1}`} />
              <div className={styles.filter}></div>
              <div className={styles.textOverlay}>{text}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PhotoSlider;
