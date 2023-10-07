import * as React from "react";
import { useMediaQuery } from "react-responsive";

export const DeviceContext = React.createContext<boolean | null>(null);

export const DeviceContextProvider = (props: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 1084px)" });

  return (
    <DeviceContext.Provider value={isMobile}>
      {props.children}
    </DeviceContext.Provider>
  );
};
