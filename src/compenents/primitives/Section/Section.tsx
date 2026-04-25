import React from "react";
import Container from "../Container/Container";
import styles from "./Section.module.css";

const spacingMap = {
  none: "var(--space-0)",
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)",
};

const Section = ({
  children,
  as = "section",
  contained = false,
  containerSize,
  spaceY = "sm",
  spaceTop,
  spaceBottom,
  bg,
  className = "",
  id,
  ...props
}) => {

  const Component = as;

  const paddingTop = spaceTop
    ? spacingMap[spaceTop]
    : spacingMap[spaceY];

  const paddingBottom = spaceBottom
    ? spacingMap[spaceBottom]
    : spacingMap[spaceY];

  const sectionStyle = {
    paddingTop,
    paddingBottom,
  };

  const classes = [styles.section];

  if (bg) {
    classes.push(styles[`bg-${bg}`]);
  }

  if (className) {
    classes.push(className);
  }

  const content = contained ? (
    <Container size={containerSize}>
      {children}
    </Container>
  ) : (
    children
  );

  return (
    <Component
      id={id}
      className={classes.join(" ")}
      style={sectionStyle}
      {...props}
    >
      {content}
    </Component>
  );
};

export default Section;