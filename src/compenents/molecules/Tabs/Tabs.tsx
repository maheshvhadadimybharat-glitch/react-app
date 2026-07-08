import React, { useState, useRef, useEffect } from "react";
import { Text } from "../../atoms/Text";
import { Icon } from "../../atoms/Icon";
import styles from "./Tabs.module.css";

type TabItem = {
  label: string;
  icon?: string;
  content?: React.ReactNode;
  id?: string | number;
};

type TabsProps = {
  items?: TabItem[];
  variant?: "horizontal" | "vertical";
  defaultActiveIndex?: number;
  activeIndex?: number;
  onChange?: (index: number) => void;
};

const Tabs: React.FC<TabsProps> = ({
  items = [],
  variant = "horizontal",
  defaultActiveIndex = 0,
  activeIndex: controlledIndex,
  onChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(defaultActiveIndex);
  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});
  const tabsRef = useRef<Array<HTMLElement | null>>([]);

  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;

  const handleChange = (index: number) => {
    if (!isControlled) setInternalIndex(index);
    if (onChange) onChange(index);
  };

  // Indicator position calculation
  useEffect(() => {
    const currentTab = tabsRef.current[activeIndex];
    if (!currentTab) return;

    if (variant === "horizontal") {
      setIndicatorStyle({
        width: currentTab.offsetWidth + "px",
        transform: `translateX(${currentTab.offsetLeft}px)`
      });
    } else {
      setIndicatorStyle({
        height: currentTab.offsetHeight + "px",
        transform: `translateY(${currentTab.offsetTop}px)`
      });
    }
  }, [activeIndex, variant, items]);

  return (
    <div className={`${styles.tabs} ${styles[variant]}`}>
      
      {/* Tab List */}
      <div
        role="tablist"
        aria-orientation={variant === "vertical" ? "vertical" : "horizontal"}
        className={styles.tabList}
      >
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={index}
              ref={(el) => (tabsRef.current[index] = el)}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${index}`}
              id={`tab-${index}`}
              className={`${styles.tabButton} ${
                isActive ? styles.active : ""
              }`}
              onClick={() => handleChange(index)}
            >
              {item.icon && (
                <Icon name={item.icon} size={24} />
              )}

              <Text as="span">
                {item.label}
              </Text>
            </button>
          );
        })}

        {/* Animated Indicator */}
        <div
          className={styles.indicator}
          style={indicatorStyle}
        />
      </div>

      {/* Tab Panel */}
      <div className={styles.tabPanelWrapper}>
        {items.map((item, index) => {
          if (index !== activeIndex) return null;

          return (
            <div
              key={index}
              role="tabpanel"
              id={`tabpanel-${index}`}
              aria-labelledby={`tab-${index}`}
              className={styles.tabPanel}
            >
              {typeof item.content === "string"
                ? <Text>{item.content}</Text>
                : item.content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;