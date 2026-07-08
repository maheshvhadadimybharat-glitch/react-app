import React from "react";
import SidebarItem from "./SidebarItem";
import styles from "./Sidebar.module.css";

type SidebarItemShape = {
  label: string;
  href?: string;
  icon?: React.ElementType;
  collapsible?: boolean;
  children?: SidebarItemShape[];
  roles?: string[];
};

const Sidebar: React.FC<{ items?: SidebarItemShape[] }> = ({ items = [] }) => {
  return (
    <ul className={styles.sidebar}>
      {items.map((item) => (
        <SidebarItem key={item.label} {...item} />
      ))}
    </ul>
  );
};

export default Sidebar;