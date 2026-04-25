import React from "react";
import { Text } from "../../atoms/Text"
import { Icon } from "../../atoms/Icon"
import { Image } from "../../atoms/Image"

const SocialLinks = ({
  SocialLinksHeading
}) => {

  return (
    <div>
     { SocialLinksHeading && (
      <h6 className="mb-3"> {SocialLinksHeading} </h6>
     )} 
    <div className="flex items-center gap-2 mb-5">
      <Text variant="default"as="a"href="#">
        <Icon name="twitter" size={24} /></Text>

      <Text variant="default"as="a"href="#">
        <Icon name="instagram" size={24} color="#d62976" /></Text>

      <Text variant="default"as="a"href="#">
        <Icon name="facebook" size={24} color="#1877F2" /></Text>

      <Text variant="default"as="a"href="#">
        <Icon name="linkedin" size={24} color="#0A66C2"/></Text>

      <Text variant="default"as="a"href="#">
        <Icon name="whatsapp" size={24} color="#25D366"/></Text>
        
      <Text variant="default"as="a"href="#">
        <Icon name="youtube" size={24} color="#d62976" /></Text>
    </div>
  </div>  
  )
}

export default SocialLinks;