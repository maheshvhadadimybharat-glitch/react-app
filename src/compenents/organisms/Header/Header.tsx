import React from "react";
import NavigationLinks from "../../molecules/NavigationLinks/NavigationLinks";
import MobileMenu from "../../molecules/MobileMenu/MobileMenu"; 
import { Button } from "../../atoms/Button";
import Branding from "../../molecules/Branding/Branding"; 
import FontSizeControls from "../../molecules/FontSizeControls/FontSizeControls";
import SupportSection from "../../molecules/SupportSection/SupportSection";
import Section from "../../primitives/Section/Section";
import styles from "./Header.module.css";
import UserDropdown from "../UserDropdown/UserDropdown"

const Header = ({ 
  navLinks, 
  withTopabar = true,
  variant = "default", //  default | compact
  contained = true,
  isAuthenticated = false 
}) => {

  const headerClasses = [
    styles.header,
    styles[variant],
    "border-b border-b-gray-300"
  ];

  return (
    <header className={headerClasses.join(" ")}>

      {/* ================= TOP BAR ================= */}
      {withTopabar && variant !== "auth" && (
        <Section 
          className={styles.topBar}
          contained={contained} 
          spaceY="sm" // slightly smaller
        >
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img 
                src="https://cdn-beta.mybharats.in/mybharat/assets/img/mybharat/Flag%20of%20India.png" 
                alt="India Flag" 
              />
              <span className="text-medium">Government of India</span>  
            </div>

            <div className="flex items-center gap-2">
              <FontSizeControls/>
              <SupportSection/>
            </div>   
          </div>
        </Section>
      )}

      {/* ================= MAIN HEADER ================= */}
      <Section 
        contained={contained}
        spaceY={variant === "compact" ? "xs" : "sm"} // dynamic spacing
      >
        <div className="flex items-center"> 

          {/* Logo */}
          <Branding
            hasEmblem={variant !== "auth"}
            hasSeperator={variant !== "auth"}
          />

          {/* Right Side */}
          <div className="flex items-center ml-auto gap-2">

            {/* Hide nav in auth */}
            {variant !== "auth" && (
              <NavigationLinks links={navLinks} />
            )}

            {/* Auth Buttons */}
            {variant !== "auth" && (
              <div className="headerRight gap-3 hidden lg:flex flex-row">
                
                {!isAuthenticated ? (
                    <>
                        <Button
                        label="Login" 
                        variant="primary"
                        size="default"
                        />
                        <Button
                        label="Register" 
                        variant="primary-outlined"
                        size="default"
                        />
                    </>
                    ) : (
                     
                    <UserDropdown
                        user={{ name: "Mahesh V", email: "mahesh@example.com" }}
                        menuItems={[
                        { label: "Dashboard", icon: "MdDashboard", onClick: () => {} },
                        { label: "Logout", icon: "MdLogout", onClick: () => {} },
                        ]}
                    />
                   
                )}
              
              </div>
            )}

          </div>
        </div>
      </Section>

      {/* Mobile Menu */}
      {variant !== "auth" && (
        <MobileMenu 
        links={navLinks} 
        isAuthenticated={isAuthenticated}
        />
      )}

    </header>
  );
};

export default Header;