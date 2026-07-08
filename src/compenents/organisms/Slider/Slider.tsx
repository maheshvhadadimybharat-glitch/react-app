import React, { useEffect, useState } from "react";
import SlideItem from "../../molecules/SlideItem/SlideItem";
import styles from "./Slider.module.css";
import { Icon } from "../../atoms/Icon";

type Slide = {
  image?: string;
  alt?: string;
  heading?: React.ReactNode;
  description?: React.ReactNode;
  link?: string;
};

type SliderProps = {
  slides?: Slide[];
  autoPlay?: boolean;
  interval?: number;
};

const Slider: React.FC<SliderProps> = ({
  slides = [],
  autoPlay = true,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

   // Next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Autoplay
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, isPaused, interval, slides.length]);

  if (!slides.length) return null;
  
  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
       {/* Slides wrapper */}
      <div
        className={styles.track}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`
        }}
      >
        {slides.map((slide, index)=>(
          <SlideItem
            key={index}
            image={slide.image}
            alt={slide.alt}
            heading={slide.heading}
            description={slide.description}
            link={slide.link}
          />
        ))}
      </div>
         {/* Navigation */}
      <button
        className={styles.prev}
        onClick={prevSlide}
      >
      <Icon name="arrowLeft" size="xl"/>
      </button>

      <button
        className={styles.next}
        onClick={nextSlide}
      >
        <Icon name="arrowRight" size="xl"/>
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.active : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider;