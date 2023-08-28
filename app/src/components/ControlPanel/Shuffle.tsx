import ShuffleIcon from "@mui/icons-material/Shuffle";
import styles from "./Shuffle.module.scss";

interface ShuffleProps {
  isShuffle: boolean;
  onClickHandle: () => void;
}

export const Shuffle = (props: ShuffleProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.button} ${props.isShuffle && styles.active}`}>
        <ShuffleIcon
          sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
          onClick={props.onClickHandle}
        />
      </div>
    </div>
  );
};
