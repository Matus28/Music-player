import { Song } from "../../utils/types";
import { Controls } from "./Controls";
import { LoadTrack } from "./LoadTrack";
import { ProgressSlider } from "./ProgressSlider";
import { Shuffle } from "./Shuffle";
import { VolumeControls } from "./VolumeControls";

import "./ControlPanel.css";

interface ControlPanelProps {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  currentTrackList: Song[];
  currentSong: Song | null;
  songIndex: number;
  ended: boolean;
  duration: number;
  position: number;
  isShuffle: boolean;
  onSetSongIndex: (newValue: number) => void;
  onSetCurrentSong: (newValue: Song) => void;
  onSetTriggerEnd: (newValue: boolean) => void;
  onSetPosition: (newValue: number) => void;
  onSetDuration: (newValue: number) => void;
  onHandleNext: () => void;
  onShuffleHandle: () => void;
}

export const ControlPanel = (props: ControlPanelProps): JSX.Element => {
  return (
    <div className="control-panel">
      <LoadTrack
        currentSong={props.currentSong}
        musicPlayer={props.musicPlayer}
        setDuration={props.onSetDuration}
        onHandleNext={props.onHandleNext}
      />
      <Controls
        musicPlayer={props.musicPlayer}
        duration={props.duration}
        position={props.position}
        onSetPosition={props.onSetPosition}
        currentTrackList={props.currentTrackList ?? []}
        songIndex={props.songIndex}
        onSetSongIndex={props.onSetSongIndex}
        onSetCurrentSong={props.onSetCurrentSong}
        onHandleNext={props.onHandleNext}
        ended={props.ended}
        onSetTriggerEnd={props.onSetTriggerEnd}
      />
      <ProgressSlider
        musicPlayer={props.musicPlayer}
        duration={props.duration}
        position={props.position}
        onSetPosition={props.onSetPosition}
      />
      <Shuffle
        isShuffle={props.isShuffle}
        onClickHandle={props.onShuffleHandle}
      />
      <VolumeControls musicPlayer={props.musicPlayer} />
    </div>
  );
};
