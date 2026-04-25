import React from "react";
import styles from "./SidebarLayout.module.css";

const SidebarLayout = ({
  sidebar,
  children
}) => {

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        {sidebar}
      </aside>

      <main className={styles.content}>
        {children}
      </main>
    </div>
  );
};

export default SidebarLayout;