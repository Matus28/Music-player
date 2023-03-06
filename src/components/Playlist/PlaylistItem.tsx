import * as React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditPlaylistMenu } from "../Menu/EditPlaylistMenu";
import "./PlaylistItem.css";
import { Button } from "@mui/material";
import { EditPlaylistForm } from "../Dialogs/EditPlaylistForm";
import { Playlist } from "../../utils/types";

export const PlaylistItem = (props: {
  playlist: Playlist;
  playlists: Playlist[];
  isActive: boolean;
  onItemClick: () => void;
  onEditPlaylist: (formData: {
    playlistId: number;
    playlistName: string;
  }) => void;
  onRemovePlaylist: (formData: { playlistId: number }) => void;
}): JSX.Element => {
  const status = props.isActive ? "active" : "";

  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (option: string) => {
    handleClose();
    switch (option) {
      case "edit":
        setOpenEditDialog(true);
        break;
      case "remove":
        props.onRemovePlaylist({ playlistId: props.playlist.playlistId });
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <div className="playlist-item">
        <div
          className={`playlist-item__title ${status}`}
          onClick={() => {
            props.onItemClick();
          }}
        >
          {props.playlist.playlistTitle}
        </div>
        {props.playlist.playlistIsDeletable && (
          <div className="playlist-item-menu">
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
              onSelect={onSelect}
            />
            {openEditDialog && (
              <EditPlaylistForm
                open={openEditDialog}
                handleClose={(): void => setOpenEditDialog(false)}
                playlist={props.playlist}
                playlists={props.playlists}
                onUpdatePlaylist={props.onEditPlaylist}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
};
