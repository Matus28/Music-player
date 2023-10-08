import * as React from "react";
import { VolumeSlider } from "./CustomSlider";
import { VolumeButtons } from "./VolumeButtons";
import styles from "./VolumeControls.module.scss";

export const VolumeControls = (props: {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
}): JSX.Element => {
  const [volume, setVolume] = React.useState<number>(50);
  const [mute, setMute] = React.useState<boolean>(false);

  const handleChangeVolume = (event: Event, newValue: number | number[]) => {
    const newValueNumber = Array.isArray(newValue) ? newValue[0] : newValue;
    if (props.musicPlayer.current?.volume !== undefined) {
      props.musicPlayer.current.volume = newValueNumber / 100;
      setVolume(newValue as number);
    }
  };

  const handleOnMute = (): void => {
    if (props.musicPlayer.current?.muted !== undefined) {
      props.musicPlayer.current.muted = !mute;
      setMute(!mute);
    }
  };

  return (
    <div className={styles.wrapper}>
      <VolumeButtons volume={volume} isMuted={mute} onMute={handleOnMute} />
      <VolumeSlider
        valueLabelDisplay="off"
        aria-label="volume-indicator"
        value={volume}
        min={0}
        step={1}
        max={100}
        onChange={handleChangeVolume}
      />
    </div>
  );
};
