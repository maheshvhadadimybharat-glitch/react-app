import React from "react";
import { NavLinkItem } from "../../atoms/NavLinkItem";
import { Icon } from "../../atoms/Icon";

type NavSubLink = { to?: string; label?: string; className?: string };
type NavLinkType = { to?: string; label?: string; children?: NavSubLink[] };

const NavigationLinks: React.FC<{ links?: NavLinkType[] }> = ({ links = [] }) => {
  return (
    <nav className="NavigationLinks items-center hidden lg:flex">
      {links.map((link)=>{
        // Normal Link
        if (!Array.isArray(link.children)) {
          return <NavLinkItem key={link.to || link.label} {...link} />;
        }

        // Link with submenu
        return (
          <div key={link.label} className="relative group">
            {/* Parent Menu */}
            <button 
              className="flex items-center px-3 py-2 gap-1 hover:text-primary"
            >
              {link.label}
            <Icon name="dropdown" />
            </button>

            {/* Submenu */}
            <div 
              className="
                absolute top-full left-0 mt-2
                bg-white border border-gray-200 rounded shadow-md
                min-w-[180px] z-50
                opacity-0 invisible
                group-hover:opacity-100 group-hover:visible
                transition-all duration-200
              ">
                {link.children.map((subLink) => (
                <NavLinkItem
                  key={subLink.to}
                  {...subLink}
                  className="px-4 py-2 hover:bg-gray-50 flex"
                />
              ))}
            </div>           
          </div>
        )

      })}
    </nav>
  );
};

export default NavigationLinks;