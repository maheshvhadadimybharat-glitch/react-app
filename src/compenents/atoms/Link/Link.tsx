import React from "react";
import { Text } from "../Text";
import styles from "./Link.module.css";

const Link = ({
  children,
  href,
  to,
  target,
  rel,
  variant = "default", // default | dark | inverted
  className = "",
  ...props
}) => {

  // style variants
  const variantClass = styles[variant] || styles.default;

  // strict validation
  if (process.env.NODE_ENV !== "production") {
    if (!href && !to) {
      throw new Error(
        'Link atom requires either "href" or "to" prop.'
      );
    }

    if (href && to) {
      throw new Error(
        'Link atom: Use either "href" or "to", not both.'
      );
    }
  }

  // external link detection
  const isExternal =
    href && (href.startsWith("http") || href.startsWith("//"));

  // merge classes
  const classes = `${styles.link} ${variantClass} ${className}`;

  return (
    <Text
      variant="link"
      as="a"
      href={href}
      target={isExternal ? "_blank" : target}
      rel={isExternal ? "noopener noreferrer" : rel}
      className={classes}
      {...props}
    >
      {children}
    </Text>
  );
};

export default Link;