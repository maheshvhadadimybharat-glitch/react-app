import { useState } from "react";

const useAccordion = ({
  allowMultiple = false,
  openIndexes,
  onChange,
}) => {
    
  const [internalOpenIndexes, setInternalOpenIndexes] = useState([]);

  const isControlled = openIndexes !== undefined;

  const currentOpenIndexes = isControlled
    ? openIndexes
    : internalOpenIndexes;
  
  const toggleIndex = (index) => {
    let newIndexes;

    if (allowMultiple) {
      if (currentOpenIndexes.includes(index)) {
        newIndexes = currentOpenIndexes.filter((i) => i !== index);
      } else {
        newIndexes = [...currentOpenIndexes, index];
      }
    } else {
      if (currentOpenIndexes.includes(index)) {
        newIndexes = [];
      } else {
        newIndexes = [index];
      }
    }

    if (isControlled) {
      onChange?.(newIndexes);
    } else {
      setInternalOpenIndexes(newIndexes);
    }
  };

  return {
    openIndexes: currentOpenIndexes,
    toggleIndex,
  };
};

export default useAccordion;