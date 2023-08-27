import styles from "./Cover.module.scss";
import Placeholder from "../../../public/img/music-placeholder.png";

export const Cover = (props: { path?: string }): JSX.Element => {
  return (
    <div className={styles.cover}>
      <img
        src={props.path ? props.path : Placeholder}
        alt="Currently playing song's album cover."
      />
    </div>
  );
};
