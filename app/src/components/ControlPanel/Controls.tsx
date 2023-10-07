import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Song } from "../../utils/types";
import styles from "./Controls.module.scss";
import { DeviceContext } from "../../context/DeviceContext";

interface ControlsProps {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  songIndex: number | null;
  ended: boolean;
  duration: number;
  position: number;
  isPlaying: boolean;
  onSetTriggerEnd: (newValue: boolean) => void;
  onSetPosition: (newValue: number) => void;
  onHandleNext: () => void;
  onHandlePrevious: () => void;
  onSetIsPlaying: () => void;
}

export const Controls = (props: ControlsProps): JSX.Element => {
  const isMobile = React.useContext(DeviceContext);

  const positionAnimation = React.useRef<number>();

  const controlActive = props.songIndex !== null ? true : false;

  const repeat = React.useCallback((): void => {
    if (positionAnimation) {
      const currentTime = props.musicPlayer.current?.currentTime as number;
      props.onSetPosition(Math.round(currentTime * 10) / 10);

      positionAnimation.current = requestAnimationFrame(repeat);
    }
  }, [props.musicPlayer, props.duration]);

  React.useEffect(() => {
    if (props.musicPlayer && props.isPlaying) {
      props.musicPlayer.current?.play();
      positionAnimation.current = requestAnimationFrame(repeat);
    } else if (props.musicPlayer && !props.isPlaying) {
      props.musicPlayer.current?.pause();
      cancelAnimationFrame(positionAnimation.current ?? 0);
    }
  }, [props.musicPlayer, props.isPlaying, repeat]);

  React.useEffect(() => {
    if (!props.isPlaying) {
      handleTogglePlay();
    }
  }, [props.songIndex]);

  React.useEffect(() => {
    if (props.ended) {
      handleTogglePlay();
      props.onSetTriggerEnd(!props.ended);
    }
  }, [props.ended]);

  const handleTogglePlay = (): void => {
    if (controlActive) {
      props.onSetIsPlaying();
    }
  };

  const handleOnRewind = (): void => {
    if (props.musicPlayer.current?.currentTime !== undefined && controlActive) {
      props.musicPlayer.current.currentTime -= 10;
    }
  };

  const handleOnForward = (): void => {
    if (props.musicPlayer.current?.currentTime !== undefined && controlActive) {
      props.musicPlayer.current.currentTime += 10;
    }
  };

  return (
    <div className={styles.playback}>
      <SkipPreviousIcon onClick={props.onHandlePrevious} />
      {!isMobile && (
        <FastRewindIcon onClick={handleOnRewind} className={styles.rewind} />
      )}

      <div className={styles.playbutton}>
        {props.isPlaying ? (
          <PauseIcon onClick={handleTogglePlay} />
        ) : (
          <PlayArrowIcon onClick={handleTogglePlay} />
        )}
      </div>
      {!isMobile && (
        <FastForwardIcon onClick={handleOnForward} className={styles.forward} />
      )}
      <SkipNextIcon onClick={props.onHandleNext} />
    </div>
  );
};
