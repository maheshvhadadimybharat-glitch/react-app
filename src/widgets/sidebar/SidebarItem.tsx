import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

type SidebarItemProps = {
  label: string;
  href?: string;
  icon?: any;
  roles?: string[];
  children?: SidebarItemProps[];
};

const SidebarItem = ({ href, label, icon: Icon, children }: SidebarItemProps) => {
  const hasChildren = children && children.length > 0;
  const [open, setOpen] = useState(false);

  const location = useLocation();

  const isActive = href && location.pathname.startsWith(href);

  const isChildActive =
    hasChildren &&
    children?.some((child) =>
      location.pathname.startsWith(child.href || "")
    );

  // Auto open when child is active
  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [location.pathname]);

  const handleToggle = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    }
  };

  return (
    <li className={styles.item}>
      <div
        className={`${styles.itemHeader} ${
          isActive || isChildActive ? styles.active : ""
        }`}
        onClick={handleToggle}
      >
        <div className={styles.left}>
          {Icon && <Icon size={18} />}
          {hasChildren ? (
            <span>{label}</span>
          ) : (
            <Link to={href!}>{label}</Link>
          )}
        </div>

        {hasChildren && (
          <span className={`${styles.arrow} ${open ? styles.open : ""}`}>
            ▸
          </span>
        )}
      </div>

      {/* Animated Collapse */}
      <ul
        className={`${styles.submenu} ${open ? styles.open : ""}`}
      >
        {children?.map((child) => (
          <SidebarItem key={child.label} {...child} />
        ))}
      </ul>
    </li>
  );
};

export default SidebarItem;