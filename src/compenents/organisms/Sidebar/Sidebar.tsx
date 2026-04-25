import React from "react";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.css";

const Sidebar: React.FC<any> = ({ items = [] }) => {
  return (
    <ul className={styles.sidebar}>
      {items.map((item) => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </ul>
  );
};

export default Sidebar;