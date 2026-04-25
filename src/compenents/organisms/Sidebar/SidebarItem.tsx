import React from "react";
import { useState } from "react";
import { Icon } from "../../atoms/Icon";
import { Link } from "../../atoms/Link";
import styles from "./Sidebar.module.css";

const SidebarItem = ({
  label,
  href,
  icon,
  children = [],
}) => {

  const hasChildren = children && children.length > 0;

  const [open, setOpen] = useState(false);

  const isActive = window.location.pathname === href;

  return (
    <li>

      <div
        className={`${styles.item} ${isActive ? styles.active : ""}`}
        onClick={() => hasChildren && setOpen(!open)}
      >
        <div className={styles.itemInner}>

          {icon && <Icon name={icon} size="md" />}

          {href ? (
            <Link variant="dark" href={href}>{label}</Link>
          ) : (
            <span>{label}</span>
          )}

        </div>

        {hasChildren && (
          <span className={styles.arrow}>
            {open ? 
            (<>
              <Icon name="dropdown" size="md" />
            </>) 
            : (<>
              <Icon name="arrowRight" size="md" />
            </>)
            }
          </span>
        )}
      </div>

      {hasChildren && open && (
        <ul className={styles.subList}>
          {children.map((child) => (
            <SidebarItem key={child.label} {...child} />
          ))}
        </ul>
      )}

    </li>
  );
};

export default SidebarItem;