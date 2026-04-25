import React from "react";
import ListItem from "../../molecules/ListItem/ListItem";
import { getLayoutClasses } from "../../../common/utils/getLayoutClasses";

const List = ({
  items,
  children,
  as: Component = "ul",
  variant = "vertical",
  columns,
  gap = "md",
  showIcon = true,
  iconPosition = "left",
  iconBackground,
  iconColor,
  iconSize = "lg",
  linkVariant = "default",
  className = ""
}) => {

  const itemAs = Component === "div" ? "div" : "li";

  const containerClass = getLayoutClasses({
    variant,
    columns,
    gap
  });

  let content = children;

  if (items) {
    content = items.map((item, index) => (
      <ListItem
        key={item.id || index}
        as={itemAs}
        {...item}
        showIcon={showIcon}
        iconPosition={iconPosition}
        iconBackground={iconBackground}
        iconColor={iconColor}
        iconSize={iconSize}
        linkVariant={linkVariant}
      />
    ));
  }

  if (Component === "nav") {
    return (
      <nav className={className}>
        <ul className={containerClass}>{content}</ul>
      </nav>
    );
  }

  return (
    <Component
      className={`${containerClass} ${className}`}
      role={Component === "div" ? "list" : undefined}
    >
      {content}
    </Component>
  );
};

List.Item = ListItem;

export default List;