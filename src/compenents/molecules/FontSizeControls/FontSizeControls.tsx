import React from "react";
import { Button } from "../../atoms/Button";

const FontSizeControls: React.FC<any> = () => {
  return (
    <div className="items-center hidden lg:flex">
      <Button
        variant="default"
        size="xs"
        label="A-"
      />
      <Button
        variant="default"
        size="xs"
        label="A"
      />
      <Button
        variant="default"
        size="xs"
        label="A+"
      />
    </div>
  );
}

export default FontSizeControls;