import styles from "./PlayingIcon.module.scss";

export const PlayingIcon = (props: { active: boolean }): JSX.Element => {
  return (
    <div className={`${styles.icon} ${props.active && styles.active}`}>
      <span />
      <span />
      <span />
    </div>
  );
};
