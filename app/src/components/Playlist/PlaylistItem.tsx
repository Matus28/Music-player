import * as React from "react";
import { EditMenu } from "../Menu/EditMenu";
import { EditPlaylistForm } from "../Dialogs/EditPlaylistForm";
import { Playlist } from "../../utils/types";
import { ConfirmDialog } from "../Dialogs/ConfirmDialog";
import { OptionButton } from "../Button/OptionButton";
import styles from "./PlaylistItem.module.scss";

export interface PlaylistItemProps {
  playlists: Playlist[];
  playlist: Playlist;
  isActive: boolean;
  onItemClick: () => void;
}

export const PlaylistItem = (props: PlaylistItemProps): JSX.Element => {
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const status = props.isActive ? "active" : "";

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onSelect = (option: string) => {
    handleClose();
    switch (option) {
      case "edit":
        setOpenEditDialog(true);
        break;
      case "remove":
        setOpenConfirmDialog(true);
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <div className={styles.wrapper}>
        <div
          className={`${styles.title} ${status && styles.active}`}
          onClick={() => {
            props.onItemClick();
          }}
        >
          {props.playlist.playlistName}
        </div>
        {props.playlist.playlistDeletable && (
          <div className={styles.menu}>
            <OptionButton isOpen={open} handleClick={handleClick} />
            <EditMenu
              anchorEl={anchorEl}
              options={["edit", "remove"]}
              open={open}
              onClose={handleClose}
              onSelect={onSelect}
            />
            {openEditDialog && (
              <EditPlaylistForm
                playlists={props.playlists}
                playlist={props.playlist}
                open={openEditDialog}
                handleClose={(): void => setOpenEditDialog(false)}
              />
            )}
            {openConfirmDialog && (
              <ConfirmDialog
                open={openConfirmDialog}
                playlistId={props.playlist.playlistId}
                playlistTitle={props.playlist.playlistName}
                handleClose={(): void => setOpenConfirmDialog(false)}
              />
            )}
          </div>
        )}
      </div>
    </li>
  );
};
