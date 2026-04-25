import React from "react";
import { useRef, useEffect, useState } from "react";
import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms/Icon";
import styles from "./Accordion.module.css";

const AccordionItem = ({
  title,
  children,
  isOpen,
  onToggle,
}) => {
  const [height, setHeight] = useState("0px");
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        const scrollHeight = contentRef.current.scrollHeight;
        setHeight(`${scrollHeight}px`);

        const timeout = setTimeout(() => {
          setHeight("auto");
        }, 300);

        return () => clearTimeout(timeout);
      } else {
        setHeight(`${contentRef.current.scrollHeight}px`);
        requestAnimationFrame(() => {
          setHeight("0px");
        });
      }
    }
  }, [isOpen]);

  return (
    <div className={styles.accordionItem}>
      <button
        type="button"
        className={styles.header}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <Text variant="h5">{title}</Text>
        <span className={`${styles.icon} ${isOpen ? styles.rotate : ""}`}>
          <Icon 
            name="arrowRight" 
            size="xl" 
            />
        </span>
      </button>

      <div
        ref={contentRef}
        style={{ maxHeight: height }}
        className={styles.contentWrapper}
      >
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;