import * as React from "react";
import styles from "./TabElement.module.scss";
import { ActiveTabContext } from "../../context/ActiveTabContext";

export const TabElement = (props: { title: string }): JSX.Element => {
  const tabContext = React.useContext(ActiveTabContext);

  return (
    <button
      onClick={() => tabContext?.setActiveTab(props.title)}
      className={`${styles.tab} ${
        tabContext?.activeTab === props.title && styles.active
      }`}
    >
      {props.title}
    </button>
  );
};
