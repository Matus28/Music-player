import { Link } from "react-router-dom";
import styles from "./NavItem.module.scss";

interface NavItemProps {
  href: string;
  text: string;
  onClick?: () => void;
}

export const NavItem = ({ href, text, onClick }: NavItemProps): JSX.Element => {
  return (
    <div className={styles.link}>
      <Link to={href} onClick={onClick}>
        {text}
      </Link>
    </div>
  );
};
