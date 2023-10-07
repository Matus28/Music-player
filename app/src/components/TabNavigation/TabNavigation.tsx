import * as React from "react";
import { TabElement } from "./TabElement";
import styles from "./TabNavigation.module.scss";

export const TabNavigation = (): JSX.Element => {
  const tabList = ["Playlists", "Tracklist", "Current Song"];
  return (
    <div className={styles.tabs}>
      {tabList.map((tab: string, index: number) => (
        <TabElement key={index} title={tab} />
      ))}
    </div>
  );
};
