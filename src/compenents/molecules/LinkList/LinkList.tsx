import React from "react";

import { Link } from "../../atoms/Link";
import { Text } from "../../atoms/Text";

const LinkList = ({
  title,
  links = [],
  variant = "default" 
}) => {
  return (
    <div className="px-0 lg:px-10">
      <Text as="h6" className="mb-3">
        {title}
      </Text>

      <ul>
        {links.map((link) => (
          <li key={link.label} className="py-1">
            <Link 
              href={link.href} 
              variant={variant === "dark" ? "dark" : "default"}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LinkList;