import React from "react";
import { Image } from "../../atoms/Image";
import { Text } from "../../atoms/Text";
import { Link } from "../../atoms/Link";
import styles from "./SlideItem.module.css";

const SlideItem = ({
  image,
  alt,
  heading,
  description,
  link
  }
  ) => {
  
  const hasContent = heading || description || link;
  
  return (
    <div className={`${styles.slide} flex flex-col xl:flex-row items-center justify-between`}>
      {hasContent &&  (
        <div className="w-full xl:w-[33%] lg:ml-20">
          {heading && <Text as="h1">{heading}</Text>}
          {description && <Text as="p" className="mb-4">{description}</Text>}
          {link && <Link href={link}>Know More</Link>}
        </div>
      )}
     
      <div className={`w-full ${hasContent ? "xl:w-[67%]" : "xl:w-full"}`}>
        <Image src={image} alt={alt}/>
      </div>
    </div>
  )
} 

export default SlideItem