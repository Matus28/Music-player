import styled from "@emotion/styled";
import { Slider, SliderProps, Stack } from "@mui/material";

export const PositionSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  color: "#52af77",
  width: "400px",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:hover": {
      height: 24,
      width: 24,
      boxShadow: "inherit",
      cursor: "pointer",
    },
    "&:focus, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
      cursor: "auto",
    },
    "&:before": {
      display: "none",
    },
  },
}));

export const VolumeSlider = styled(Slider)<SliderProps>(({ theme }) => ({
  color: "#52af77",
  width: "100px",
  height: 8,
  "& .MuiSlider-thumb": {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:hover": {
      height: 24,
      width: 24,
      boxShadow: "inherit",
      cursor: "pointer",
    },
    "&:focus, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
      cursor: "auto",
    },
    "&:before": {
      display: "none",
    },
  },
}));
