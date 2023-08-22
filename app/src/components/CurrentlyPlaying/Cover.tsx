import styles from "./Cover.module.scss";

export const Cover = (props: { path?: string }): JSX.Element => {
  return (
    <div className={styles.cover}>
      <img
        src={
          props.path ? props.path : "../../../public/img/music-placeholder.png"
        }
        alt="Currently playing song's album cover."
      />
    </div>
  );
};
