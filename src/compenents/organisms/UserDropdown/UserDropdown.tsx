import React from "react";
import { useState, useRef, useEffect } from "react";
import styles from "./UserDropdown.module.css";
import { Text } from "../../atoms/Text";
import {Icon} from "../../atoms/Icon";

const UserDropdown = ({
  user,
  menuItems = [],
}) => {

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const getInitials = (name = ""): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={styles.wrapper} ref={dropdownRef}>

      {/* Avatar Trigger */}
      <button className={styles.trigger} onClick={toggleDropdown}>
        {user?.avatar ? (
          <img 
            src={user.avatar} 
            alt={user.name} 
            className={styles.avatar}
          />
        ) : (
          <div className={styles.initials}>
            {getInitials(user?.name)}
          </div>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.menu}>

          {/* User Info */}
          <div className={styles.userInfo}>
            <Text variant="title2">{user?.name}</Text>
            <Text variant="base" as="div">{user?.email}</Text>
          </div>

          <div className={styles.divider} />

          {/* Menu Items */}
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={styles.menuItem}
              onClick={() => {
                item.onClick?.();
                setOpen(false);
              }}
            >
              {item.icon && <Icon name={item.icon} size="sm" />}
              <span>{item.label}</span>
            </button>
          ))}

        </div>
      )}

    </div>
  );
};

export default UserDropdown;