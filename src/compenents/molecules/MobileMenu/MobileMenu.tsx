import React from "react";
import { useState } from "react";
import { NavLinkItem } from "../../atoms/NavLinkItem";
import { MdMenu, MdClose, MdExpandMore } from "react-icons/md";
import { Button } from "../../atoms/Button";
import { Text } from "../../atoms/Text";

const MobileMenu = ({
    links=[],
    isAuthenticated = false,
}) => {
    const [open, setOpen] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

    const toggleSubMenu = (index: number) => {
        setOpenSubMenu((prev) => (prev === index ? null : index));
    };

    return (
        <div className="lg:hidden">
        {/* Hamburger Button */}
        <div className="flex items-end absolute top-12 right-2">
        <button className="ml-auto" onClick={() => setOpen(!open)}>
            {open ? <MdClose size={28} /> : <MdMenu size={28} />}
        </button>
        </div>
        {/* Mobile Dropdown */}
        {open && (
            <div className="
                left-0 
                top-full 
                w-full 
                bg-white 
                border 
                border-gray-200
                shadow-md 
                p-4 
                flex 
                flex-col 
                gap-2 
                z-50
                ">
            {links.map((link, index) => {
                // 👉 Normal link
                if (!Array.isArray(link.children)) {
                return <NavLinkItem key={link.to || link.label} {...link} />;
                }

                // 👉 Submenu
                return (
                <div key={link.label}>
                    <button
                    onClick={() => toggleSubMenu(index)}
                    className="flex items-center justify-between w-full px-3 py-2"
                    >
                    {link.label}
                    <MdExpandMore
                        className={`transition ${
                        openSubMenu === index ? "rotate-180" : ""
                        }`}
                    />
                    </button>

                    {openSubMenu === index && (
                    <div className="ml-4 flex flex-col">
                        {link.children.map((subLink) => (
                        <NavLinkItem
                            key={subLink.to}
                            {...subLink}
                            className="px-3 py-2 text-sm"
                        />
                        ))}
                    </div>
                    )}
                </div>
                );
            })}
            {!isAuthenticated ? (
            <div className="flex items-center flex-row gap-4 mt-4">
                <Button
                label="Login" 
                variant="primary"
                size="default" />
        
                <Button
                label="Register" 
                variant="primary-outlined"
                size="default" />
            </div>) : (
                <>
                        <Button
                        label="Dashboard" 
                        variant="primary-outlined"
                        size="default"
                        />
                        
                        <Button
                        label="Logout" 
                        variant="secondary"
                        size="default"
                        />
                    </>
            )}

            <div className="flex items-center gap-2 flex-col border-t border-gray-300 pt-6 pb-3 mt-6">
                <Text variant="">
                    Toll Free : 14472 Or 18002122729
                </Text>

                <Text
                variant="link"
                href="https://support.mybharat.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                >
                    
                support.mybharat.gov.in
                </Text>
            </div>
            </div>
        )}
        
        </div>
    );
}

export default MobileMenu;