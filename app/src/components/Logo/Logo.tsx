import styles from "./Logo.module.scss";

type LogoProps = {
  size: "small" | "regular";
};

const Logo = ({ size }: LogoProps): JSX.Element => {
  const Image = (
    <img
      src="../../../public/img/banner.png"
      alt="Logo of music player web application."
    />
  );
  return (
    <div className={styles.wrapper}>
      {size === "small" && <div className={styles.small}>{Image}</div>}
      {size === "regular" && <div className={styles.regular}>{Image}</div>}
    </div>
  );
};

export default Logo;
