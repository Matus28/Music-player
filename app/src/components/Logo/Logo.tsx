import styles from "./Logo.module.scss";
import Banner from "../../../public/img/banner.png";

type LogoProps = {
  size: "small" | "regular";
};

const Logo = ({ size }: LogoProps): JSX.Element => {
  const Image = (
    <img src={Banner} alt="Logo of music player web application." />
  );
  return (
    <div className={styles.wrapper}>
      {size === "small" && <div className={styles.small}>{Image}</div>}
      {size === "regular" && <div className={styles.regular}>{Image}</div>}
    </div>
  );
};

export default Logo;
