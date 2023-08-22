import Logo from "../Logo/Logo";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export const Header = (): JSX.Element => {
  const { state: userValue } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = (): void => {
    logout();
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link className={styles.link} to="/">
          <Logo size="small" />
          <h1>Music Player</h1>
        </Link>

        {!userValue.user && (
          <div className={styles["user-wrapper"]}>
            <div className={styles.link}>
              <Link to="/login">Login</Link>
            </div>
            <div className={styles.link}>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        )}

        {userValue.user && (
          <div className={styles["user-wrapper"]}>
            <div className={styles.link}>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
