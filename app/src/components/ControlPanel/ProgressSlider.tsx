import * as React from "react";
import { Typography } from "@mui/material";
import { formatDuration } from "../../utils/formatDuration";
import { PositionSlider } from "./CustomSlider";

interface ProgressSlider {
  musicPlayer: React.MutableRefObject<HTMLAudioElement | null>;
  duration: number;
  position: number;
  onSetPosition: (newValue: number) => void;
}

export const ProgressSlider = (props: ProgressSlider): JSX.Element => {
  const handlePositionChange = (
    event: Event,
    newValue: number | number[]
  ): void => {
    const newValueNumber = Array.isArray(newValue) ? newValue[0] : newValue;
    if (props.musicPlayer) {
      props.musicPlayer.current?.currentTime !== undefined
        ? (props.musicPlayer.current.currentTime = newValueNumber)
        : null;
      props.onSetPosition(newValueNumber);
    }
  };

  return (
    <div className="control-panel-seekbar">
      <Typography sx={{ color: "#646464" }}>
        {formatDuration(Math.floor(props.position))}
      </Typography>
      <PositionSlider
        valueLabelDisplay="off"
        aria-label="continuous-slider"
        value={props.position}
        min={0}
        max={props.duration}
        onChange={handlePositionChange}
      />
      <Typography sx={{ color: "#646464" }}>
        {formatDuration(props.duration)}
      </Typography>
    </div>
  );
};
