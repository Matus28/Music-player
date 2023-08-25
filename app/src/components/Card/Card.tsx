import * as React from "react";
import styles from "./Card.module.scss";

interface Props {
  children: React.ReactNode;
}

export const Card = (props: Props): JSX.Element => {
  return <div className={styles.card}>{props.children}</div>;
};
