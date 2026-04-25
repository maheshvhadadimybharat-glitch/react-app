import React from "react";
import { Image } from "../../atoms/Image";
import { Text } from "../../atoms/Text";
import { Link } from "../../atoms/Link";
import Stack from "../../primitives/Stack";
import styles from "./Card.module.css";

const Card = ({
  image,
  title,
  description,
  href,
  cta,
  className = "",
}) => {

  const classes = [styles.card, className].join(" ");

  return (
    <article className={classes}>

      {image && (
        <Image src={image} alt={title} className={styles.image} />
      )}

      <Stack gap="sm">

        {title && (
          <Text variant="h2">
            {title}
          </Text>
        )}

        {description && (
          <Text variant="base" color="secondary">
            {description}
          </Text>
        )}

        {href && cta && (
          <Link href={href}>
            {cta}
          </Link>
        )}

      </Stack>

    </article>
  );
};

export default Card;