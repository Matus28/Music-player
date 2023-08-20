import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export const VolumeButtons = (props: {
  volume: number;
  isMuted: boolean;
  onMute: () => void;
}): JSX.Element => {
  return props.isMuted || props.volume === 0 ? (
    <VolumeOffIcon
      sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
      onClick={() => props.onMute()}
    />
  ) : props.volume <= 30 ? (
    <VolumeMuteIcon
      sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
      onClick={() => props.onMute()}
    />
  ) : props.volume <= 70 ? (
    <VolumeDownIcon
      sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
      onClick={() => props.onMute()}
    />
  ) : (
    <VolumeUpIcon
      sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
      onClick={() => props.onMute()}
    />
  );
};
