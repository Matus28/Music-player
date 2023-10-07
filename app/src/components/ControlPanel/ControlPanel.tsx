import * as React from "react";
import { Song } from "../../utils/types";
import { Controls } from "./Controls";
import { LoadTrack } from "./LoadTrack";
import { ProgressSlider } from "./ProgressSlider";
import { Shuffle } from "./Shuffle";
import { VolumeControls } from "./VolumeControls";
import styles from "./ControlPanel.module.scss";

interface ControlPanelProps {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  playingTrackList: Song[];
  playingSongIndex: number | null;
  ended: boolean;
  isShuffle: boolean;
  isPlaying: boolean;
  onSetTriggerEnd: (newValue: boolean) => void;
  onHandleNext: () => void;
  onHandlePrevious: () => void;
  onShuffleHandle: () => void;
  onSetIsPlaying: () => void;
}

export const ControlPanel = (props: ControlPanelProps): JSX.Element => {
  const [duration, setDuration] = React.useState<number>(0);
  const [position, setPosition] = React.useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <LoadTrack
        currentSong={
          props.playingTrackList[props.playingSongIndex ?? 0] ?? null
        }
        musicPlayer={props.musicPlayer}
        setDuration={setDuration}
        onHandleNext={props.onHandleNext}
      />
      <div className={styles.controls}>
        <Controls
          musicPlayer={props.musicPlayer}
          duration={duration}
          position={position}
          onSetPosition={setPosition}
          songIndex={props.playingSongIndex}
          isPlaying={props.isPlaying}
          onHandleNext={props.onHandleNext}
          onHandlePrevious={props.onHandlePrevious}
          ended={props.ended}
          onSetTriggerEnd={props.onSetTriggerEnd}
          onSetIsPlaying={props.onSetIsPlaying}
        />
      </div>
      <div className={styles.progress}>
        <ProgressSlider
          musicPlayer={props.musicPlayer}
          duration={duration}
          position={position}
          onSetPosition={setPosition}
        />
      </div>
      <div className={styles.shuffle}>
        <Shuffle
          isShuffle={props.isShuffle}
          onClickHandle={props.onShuffleHandle}
        />
      </div>
      <div className={styles.volume}>
        <VolumeControls musicPlayer={props.musicPlayer} />
      </div>
    </div>
  );
};
