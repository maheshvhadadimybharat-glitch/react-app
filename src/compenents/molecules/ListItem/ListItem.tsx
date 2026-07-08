import React from "react";
import { Icon } from "../../atoms/Icon";
import { Text } from "../../atoms/Text";
import { Link } from "../../atoms/Link";

type IconPosition = "left" | "right" | "top" | "center";
type IconSize = "xs" | "sm" | "md" | "lg" | "xl";

type ListItemProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  iconName?: string;
  showIcon?: boolean;
  iconPosition?: IconPosition;
  iconBackground?: string | undefined;
  iconColor?: string;
  iconSize?: IconSize;
  href?: string;
  to?: string;
  linkVariant?: string;
  className?: string;
};

const ALLOWED_ICON_POSITIONS = ["left", "right", "top", "center"];
const ALLOWED_ICON_SIZES = ["xs", "sm", "md", "lg", "xl"];

const validateVariant = (
  value: string,
  allowed: string[],
  fallback: string,
  propName: string
) => {
  if (!allowed.includes(value)) {
    console.warn(
      `Invalid "${propName}" value: "${value}". Allowed values: ${allowed.join(", ")}`
    );
    return fallback;
  }
  return value;
};

const ListItem: React.FC<ListItemProps> = ({
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

  const renderIcon = () =>
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

  const renderTitle = () => {
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

  const renderContent = () => (
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