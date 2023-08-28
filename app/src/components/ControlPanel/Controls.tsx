import * as React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FastForwardIcon from "@mui/icons-material/FastForward";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import { Song } from "../../utils/types";
import styles from "./Controls.module.scss";

interface ControlsProps {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  currentTrackList: Song[];
  songIndex: number;
  ended: boolean;
  duration: number;
  position: number;
  isPlaying: boolean;
  onSetSongIndex: (newValue: number) => void;
  onSetCurrentSong: (newValue: Song) => void;
  onSetTriggerEnd: (newValue: boolean) => void;
  onSetPosition: (newValue: number) => void;
  onHandleNext: () => void;
  onSetIsPlaying: () => void;
}

export const Controls = (props: ControlsProps): JSX.Element => {
  const positionAnimation = React.useRef<number>();

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
    props.onSetIsPlaying();
  };

  const handlePrevious = (): void => {
    let newIndex: number = props.songIndex;
    if (
      !props.isPlaying ||
      (props.isPlaying &&
        props.musicPlayer.current?.currentTime !== undefined &&
        props.musicPlayer.current?.currentTime < 5)
    ) {
      newIndex = props.songIndex <= 0 ? 0 : props.songIndex - 1;
    }
    props.onSetSongIndex(newIndex);
    props.onSetCurrentSong(props.currentTrackList[newIndex]);
    props.musicPlayer.current?.src
      ? (props.musicPlayer.current.src =
          props.currentTrackList[newIndex].songUrl)
      : null;
    props.isPlaying ? props.musicPlayer.current?.play() : handleTogglePlay();
  };

  const handleOnRewind = (): void => {
    if (props.musicPlayer.current?.currentTime !== undefined) {
      props.musicPlayer.current.currentTime -= 10;
    }
  };

  const handleOnForward = (): void => {
    if (props.musicPlayer.current?.currentTime !== undefined) {
      props.musicPlayer.current.currentTime += 10;
    }
  };

  return (
    <div className={styles.playback}>
      <SkipPreviousIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={handlePrevious}
      />
      <FastRewindIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={handleOnRewind}
      />

      {props.isPlaying ? (
        <PauseIcon
          sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
          onClick={handleTogglePlay}
        />
      ) : (
        <PlayArrowIcon
          sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
          onClick={handleTogglePlay}
        />
      )}
      <FastForwardIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={handleOnForward}
      />
      <SkipNextIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={props.onHandleNext}
        id="skipNext"
      />
    </div>
  );
};
