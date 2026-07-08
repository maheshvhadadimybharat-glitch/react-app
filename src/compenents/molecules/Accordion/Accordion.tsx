import React from "react";
import AccordionItem from "./AccordionItem";
import useAccordion from "./useAccordion";

const Accordion = ({
  items = [],
  allowMultiple = false,
  openIndexes,
  onChange,  
  className = "",
}) => {
  
 const { openIndexes: currentOpenIndexes, toggleIndex } =
  useAccordion({
    allowMultiple,
    openIndexes,
    onChange,
  });

  return (
    <div className={className}>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          isOpen={currentOpenIndexes.includes(index)}
          onToggle={() => toggleIndex(index)}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
};

export default Accordion;