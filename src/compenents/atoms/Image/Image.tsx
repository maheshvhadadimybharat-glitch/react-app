import React, { useState } from "react";
import styles from "./Image.module.css";
import Icon from "../Icon/Icon";

/* ---------------- TYPES ---------------- */

type ImageVariant = "overlay" | "inline" | "hover";

type GeoLocation = {
  lat: number;
  lng: number;
  label?: string;
};

type AspectRatio =
  | "1/1"
  | "4/3"
  | "16/9"
  | "3/2"
  | "auto";

type ObjectFit = "cover" | "contain" | "fill" | "none" | "scale-down";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  geo?: GeoLocation;
  variant?: ImageVariant;

  aspectRatio?: AspectRatio;
  fallback?: string;
  objectFit?: ObjectFit;
};

/* ---------------- HELPERS ---------------- */

const ASPECT_RATIO_MAP: Record<Exclude<AspectRatio, "auto">, string> = {
  "1/1": "1 / 1",
  "4/3": "4 / 3",
  "16/9": "16 / 9",
  "3/2": "3 / 2",
};

/* ---------------- COMPONENT ---------------- */

const Image: React.FC<ImageProps> = ({
  src,
  alt = "",
  geo,
  variant = "overlay",
  className = "",

  aspectRatio = "auto",
  fallback,
  objectFit = "cover",
  loading = "lazy",

  ...props
}) => {
  
  const [imgSrc, setImgSrc] = useState(src);

  const hasGeo = geo?.lat != null && geo?.lng != null;

  /* -------- Image Error Handling -------- */

  const handleError = () => {
    if (fallback && imgSrc !== fallback) {
      setImgSrc(fallback);
    }
  };

  /* -------- Styles -------- */

  const imageStyle: React.CSSProperties = {
    objectFit,
    width: "100%",
    height: "100%",
  };

  const wrapperStyle: React.CSSProperties =
    aspectRatio !== "auto"
      ? {
          aspectRatio: ASPECT_RATIO_MAP[aspectRatio],
        }
      : {};

  /* -------- Geo Tag -------- */

  const geoContent = hasGeo && (
    <div className={`${styles.geoTag} ${styles[variant]}`}>
      <Icon
        color="var(--color-text-light)"
        name="pin"
        size="sm"
        variant="ghost"
      />
      {geo?.label || `${geo?.lat}, ${geo?.lng}`}
    </div>
  );

  /* -------- Base Image -------- */

  const imageElement = (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={styles.image}
      style={imageStyle}
      {...props}
    />
  );

  /* -------- No Geo -------- */

  if (!hasGeo) {
    return (
      <div className={className} style={wrapperStyle}>
        {imageElement}
      </div>
    );
  }

  /* -------- Inline Variant -------- */

  if (variant === "inline") {
    return (
      <div
        className={`${styles.inlineWrapper} ${className}`}
        style={wrapperStyle}
      >
        {imageElement}
        {geoContent}
      </div>
    );
  }

  /* -------- Overlay / Hover -------- */

  return (
    <div
      className={`${styles.wrapper} ${styles[variant]} ${className}`}
      style={wrapperStyle}
    >
      {imageElement}
      {geoContent}
    </div>
  );
};

export default Image;