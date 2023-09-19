import styles from "./PlayingIcon.module.scss";

export const PlayingIcon = (props: { playing: boolean }): JSX.Element => {
  return (
    <div className={`${styles.icon} ${props.playing && styles.playing}`}>
      <span />
      <span />
      <span />
    </div>
  );
};
