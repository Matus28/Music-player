import * as React from "react";
import Logo from "../Logo/Logo";
import styles from "./NavBar.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";
import { NavItem } from "./NavItem";
import { Hamburger } from "./Hamburger";

export const NavBar = (): JSX.Element => {
  const [navActive, setNavActive] = React.useState<boolean>(false);
  const { state: userValue } = useAuthContext();
  const { logout } = useLogout();

  const handleToggleBurgerMenu = (): void => {
    setNavActive((current) => !current);
  };

  const handleClickOnBackground = (): void => {
    if (navActive) setNavActive(false);
  };

  const handleLogout = (): void => {
    logout();
  };

  return (
    <nav className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.link} to="/">
          <Logo size="small" />
          <h1>Music Player</h1>
        </Link>

        <div
          className={`${styles["menu-bar"]} ${navActive && styles.active}`}
          onClick={handleToggleBurgerMenu}
          tabIndex={0}
        >
          <Hamburger active={navActive} />
        </div>

        <div className={`${styles["menu-list"]} ${navActive && styles.active}`}>
          {!userValue.user && (
            <div className={styles["user-wrapper"]}>
              <NavItem key="login" href={"/login"} text={"Login"} />
              <NavItem key="signup" href={"/signup"} text={"Signup"} />
            </div>
          )}

          {userValue.user && (
            <div className={styles["user-wrapper"]}>
              <NavItem
                key="logout"
                href={"/"}
                text={"Logout"}
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
        <div
          className={styles.background}
          onClick={handleClickOnBackground}
          style={navActive ? { display: "block" } : { display: "none" }}
        ></div>
      </div>
    </nav>
  );
};
