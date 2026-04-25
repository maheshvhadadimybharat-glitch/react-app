import React from "react";
import { NavLink } from "react-router";

const NavLinkItem = ({ 
    to, 
    label,
    children,
    className = "",
    ...props
    }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 hover:hover:text-primary ${
          isActive ? "hover:text-primary font-semibold" : ""
        } ${className}`
      }
      {...props}
    >
      {label || children}
    </NavLink>
  );
};

export default NavLinkItem;