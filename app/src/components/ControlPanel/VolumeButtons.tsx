import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import styles from "./VolumeButtons.module.scss";

export const VolumeButtons = (props: {
  volume: number;
  isMuted: boolean;
  onMute: () => void;
}): JSX.Element => {
  let result: JSX.Element;
  if (props.isMuted || props.volume === 0) {
    result = (
      <VolumeOffIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={() => props.onMute()}
      />
    );
  } else if (props.volume <= 30) {
    result = (
      <VolumeMuteIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={() => props.onMute()}
      />
    );
  } else if (props.volume <= 70) {
    result = (
      <VolumeDownIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={() => props.onMute()}
      />
    );
  } else {
    result = (
      <VolumeUpIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={() => props.onMute()}
      />
    );
  }

  return <div className={styles.wrapper}>{result}</div>;
};
