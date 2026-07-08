import React from "react";
import NavigationLinks from "../../molecules/NavigationLinks/NavigationLinks";
import MobileMenu from "../../molecules/MobileMenu/MobileMenu";
import { Button } from "../../atoms/Button";
import Branding from "../../molecules/Branding/Branding";
import FontSizeControls from "../../molecules/FontSizeControls/FontSizeControls";
import SupportSection from "../../molecules/SupportSection/SupportSection";
import Section from "../../primitives/Section/Section";
import UserDropdown from "../UserDropdown/UserDropdown";
import styles from "./Header.module.css";

/* ---------------- TYPES ---------------- */

type HeaderVariant = "default" | "compact" | "auth";

type HeaderProps = {
  navLinks?: { label: string; href: string }[];

  variant?: HeaderVariant;
  withTopbar?: boolean;
  contained?: boolean;

  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
  };

  topbarContent?: React.ReactNode;
};

/* ---------------- COMPONENT ---------------- */

const Header: React.FC<HeaderProps> = ({
  navLinks = [],
  variant = "default",
  withTopbar = true,
  contained = true,

  isAuthenticated = false,
  user,

  topbarContent,
}) => {
  const isAuthVariant = variant === "auth";

  const headerClasses = [
    styles.header,
    styles[variant],
    "border-b border-b-gray-300",
  ].join(" ");

  return (
    <header className={headerClasses}>
      
      {/* ================= TOP BAR ================= */}
      {withTopbar && !isAuthVariant && (
        <Section
          className={styles.topBar}
          contained={contained}
          spaceY="sm"
        >
          {topbarContent ? (
            topbarContent
          ) : (
            <div className="flex items-center justify-between w-full">
              
              {/* Left */}
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-beta.mybharats.in/mybharat/assets/img/mybharat/Flag%20of%20India.png"
                  alt="India Flag"
                />
                <span className="text-medium">
                  Government of India
                </span>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2">
                <FontSizeControls />
                <SupportSection />
              </div>
            </div>
          )}
        </Section>
      )}

      {/* ================= MAIN HEADER ================= */}
      <Section
        contained={contained}
        spaceY={variant === "compact" ? "xs" : "sm"}
      >
        <div className="flex items-center">

          {/* Branding */}
          <Branding
            hasEmblem={!isAuthVariant}
            hasSeperator={!isAuthVariant}
          />

          {/* Right Side */}
          <div className="flex items-center ml-auto gap-2">

            {/* Navigation */}
            {!isAuthVariant && (
              <NavigationLinks links={navLinks} />
            )}

            {/* Auth Section */}
            {!isAuthVariant && (
              <div className="hidden lg:flex gap-3">

                {!isAuthenticated ? (
                  <>
                    <Button label="Login" variant="primary" />
                    <Button label="Register" variant="primary-outlined" />
                  </>
                ) : (
                  <UserDropdown
                    user={user || { name: "User", email: "user@email.com" }}
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

      {/* ================= MOBILE ================= */}
      {!isAuthVariant && (
        <MobileMenu
          links={navLinks}
          isAuthenticated={isAuthenticated}
        />
      )}
    </header>
  );
};

export default Header;