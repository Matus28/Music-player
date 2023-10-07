import { Song } from "../../utils/types";
import styles from "./LoadTrack.module.scss";

export const LoadTrack = (props: {
  currentSong: Song | null;
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  setDuration: (newValue: number) => void;
  onHandleNext: () => void;
}): JSX.Element => {
  const onLoadedMetadata = (): void => {
    if (props.musicPlayer) {
      props.setDuration(
        props.musicPlayer.current
          ? Math.floor(props.musicPlayer.current.duration)
          : 0
      );
    }
  };
  return (
    <div className={styles.audio}>
      <audio
        src={props.currentSong?.songUrl}
        ref={props.musicPlayer}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={props.onHandleNext}
      />
    </div>
  );
};
