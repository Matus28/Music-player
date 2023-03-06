import ShuffleIcon from "@mui/icons-material/Shuffle";

import "./Shuffle.css";

interface ShuffleProps {
  isShuffle: boolean;
  onClickHandle: () => void;
}

export const Shuffle = (props: ShuffleProps): JSX.Element => {
  return (
    <div className={`shuffle-btn ${props.isShuffle ? "active" : ""}`}>
      <ShuffleIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        className={props.isShuffle ? "active" : ""}
        onClick={props.onClickHandle}
      />
    </div>
  );
};
