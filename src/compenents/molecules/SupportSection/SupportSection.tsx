import React from "react";
import { Text } from "../../atoms/Text";

const SupportSection: React.FC = () => {
  return (
    <div className="items-center gap-2 hidden lg:flex">
      <Text variant="">
        Toll Free : 14472 Or 18002122729
      </Text>

      <span>|</span>
      
      <Text
      variant="link"
      href="https://support.mybharat.gov.in"
      target="_blank"
      rel="noopener noreferrer"
      color="white"
      >
        
      support.mybharat.gov.in
      </Text>
    </div>
  )
}

export default SupportSection;