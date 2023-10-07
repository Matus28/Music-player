import * as React from "react";
import { useMediaQuery } from "react-responsive";

export type ActiveTabContextType = {
  activeTab: string;
  setActiveTab: (selectedTab: string) => void;
};

export const ActiveTabContext =
  React.createContext<ActiveTabContextType | null>(null);

export const ActiveTabContextProvider = (props: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = React.useState<string>("Playlists");

  return (
    <ActiveTabContext.Provider value={{ activeTab, setActiveTab }}>
      {props.children}
    </ActiveTabContext.Provider>
  );
};
