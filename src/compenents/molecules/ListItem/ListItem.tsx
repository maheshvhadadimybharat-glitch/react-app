import React from "react";
import { Icon } from "../../atoms/Icon";
import { Text } from "../../atoms/Text";
import { Link } from "../../atoms/Link";

const ALLOWED_ICON_POSITIONS = ["left", "right", "top", "center"];
const ALLOWED_ICON_SIZES = ["xs", "sm", "md", "lg", "xl"];

const validateVariant: React.FC<any> = (value, allowed, fallback, propName) => {
  if (!allowed.includes(value)) {
    console.warn(
      `Invalid "${propName}" value: "${value}". Allowed values: ${allowed.join(", ")}`
    );
    return fallback;
  }
  return value;
};

const ListItem = ({
  as: Component = "li",
  children,
  title,
  description,
  iconName,
  showIcon = true,
  iconPosition = "left",
  iconBackground,
  iconColor,
  iconSize = "md",
  href,
  to,
  linkVariant = "default",
  className = ""
}) => {

  const safeIconPosition = validateVariant(
    iconPosition,
    ALLOWED_ICON_POSITIONS,
    "left",
    "iconPosition"
  );

  const safeIconSize = validateVariant(
    iconSize,
    ALLOWED_ICON_SIZES,
    "md",
    "iconSize"
  );

  // Layout control
  const layoutClasses = {
    left: "flex gap-4 items-start",
    right: "flex gap-4 items-start flex-row-reverse",
    top: "flex flex-col gap-3",
    center: "flex flex-col gap-4 items-center text-center"
  };

  const iconSizeClassMap = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-xl",
  xl: "text-2xl"
};

  const containerClass = layoutClasses[safeIconPosition];

  // Content alignment fix
  const contentAlignment =
    safeIconPosition === "center"
      ? "items-center text-center"
      : "items-start text-left";

  const renderIcon: React.FC<any> = () =>
    showIcon && iconName ? (
      <div className={iconSizeClassMap[safeIconSize]}>
        <Icon
          name={iconName}
          size={safeIconSize}
          background={!!iconBackground}
          backgroundColor={iconBackground}
          color={iconColor}
        />
      </div>
    ) : null;

  const renderTitle: React.FC<any> = () => {
    if (!title) return null;

    if (href || to) {
      return (
        <Link
          href={href}
          to={to}
          variant={linkVariant}
          className={`block mb-1 ${
            safeIconPosition === "center" ? "text-center" : ""
          }`}
        >
          <Text as="span">{title}</Text>
        </Link>
      );
    }

    return (
      <Text
        as="h5"
        className={`mb-1 ${
          safeIconPosition === "center" ? "text-center" : ""
        }`}
      >
        {title}
      </Text>
    );
  };

  const renderContent: React.FC<any> = () => (
    <div className={`flex flex-col ${contentAlignment}`}>
      {renderTitle()}
      {description && (
        <Text className="line-clamp-3 text-sm">
          {description}
        </Text>
      )}
    </div>
  );

  return (
    <Component
      className={className}
      role={Component === "div" ? "listitem" : undefined}
    >
      <div className={containerClass}>
        {children ? (
          children
        ) : (
          <>
            {renderIcon()}
            {renderContent()}
          </>
        )}
      </div>
    </Component>
  );
};

export default ListItem;