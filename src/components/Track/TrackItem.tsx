import { Button } from "@mui/material";
import * as React from "react";
import { EditPlaylistMenu } from "../Menu/EditPlaylistMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./TrackItem.css";

export const TrackItem = (props: {
  index: number;
  title: string;
  interpret: string;
  songLength: string;
  isActive: boolean | null;
  onItemClick: () => void;
}): JSX.Element => {
  const status = props.isActive ? "active" : "";

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <li>
      <div className="track-item">
        <div
          className={`track-item-info ${status}`}
          onClick={() => {
            props.onItemClick();
          }}
        >
          <div className="track-item__index">{props.index}</div>
          <div className="track-item__title">{`${props.title} (${props.interpret})`}</div>
          <div className="track-item__length">{props.songLength}</div>
        </div>
        <div className="tracklist-item-menu">
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon
              className="playlist-item__delete"
              sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
            />
          </Button>
          <EditPlaylistMenu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          />
        </div>
      </div>
    </li>
  );
};
