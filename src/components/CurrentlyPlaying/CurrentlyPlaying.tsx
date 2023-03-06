import { Song } from "../../utils/types";
import { Cover } from "./Cover";
import AddIcon from "@mui/icons-material/Add";
import GradeIcon from "@mui/icons-material/Grade";
import "./CurrentlyPlaying.css";

export const CurrentlyPlaying = (props: { data: Song | null }): JSX.Element => {
  return (
    <div className="currently-playing">
      <div className="currently-playing-image">
        <Cover path={props.data?.songCoverUrl} />
      </div>
      <div className="currently-playing-info">
        <h3>{props.data ? props.data.songTitle : ""}</h3>
        <span>{props.data ? props.data.songInterpret : ""}</span>
      </div>
      {props.data && (
        <div className="currently-playing-playlist__control">
          <AddIcon
            className="currently-playing__add"
            sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
          />
          <GradeIcon
            className="currently-playing__favorite"
            sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
          />
        </div>
      )}
    </div>
  );
};
