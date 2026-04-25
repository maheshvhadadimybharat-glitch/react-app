import React from "react";
import styles from "./Image.module.css";

const Image = ({
  src,
  alt = "",
  geo,
  variant = "overlay", // overlay | inline | hover
  className = "",
  ...props
}) => {
  const hasGeo = geo?.lat && geo?.lng;

  // No geo → fallback to pure image
  if (!hasGeo) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${styles.image} ${className}`}
        {...props}
      />
    );
  }

  const geoContent = (
    <div className={`${styles.geoTag} ${styles[variant]}`}>
      📍 {geo.label || `${geo.lat}, ${geo.lng}`}
    </div>
  );

  // INLINE variant (no wrapper needed)
  if (variant === "inline") {
    return (
      <div className={`${styles.inlineWrapper} ${className}`}>
        <img src={src} alt={alt} className={styles.image} {...props} />
        {geoContent}
      </div>
    );
  }

  // overlay & hover need wrapper
  return (
    <div className={`${styles.wrapper} ${styles[variant]} ${className}`}>
      <img src={src} alt={alt} className={styles.image} {...props} />
      {geoContent}
    </div>
  );
};

export default Image;