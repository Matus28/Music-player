import * as React from "react";
import { useMediaQuery } from "react-responsive";
import styles from "./Home.module.scss";
import Desktop from "../devices/Desktop";
import Mobile from "../devices/Mobile";
import { DeviceContext } from "../context/DeviceContext";

const Home = (): JSX.Element => {
  // const isDesktop = useMediaQuery({ query: "(min-width: 1085px)" });
  // const isMobile = useMediaQuery({ query: "(max-width: 1084px)" });
  const isMobile = React.useContext(DeviceContext);

  return (
    <div className={styles.device}>
      {/* {!isMobile && <Desktop />}
      {isMobile && <Mobile />} */}
      <Mobile />
    </div>
  );
};

export default Home;
