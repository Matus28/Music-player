import * as React from "react";
import { EditMenu } from "../Menu/EditMenu";
import { ConfirmDialog } from "../Dialogs/ConfirmDialog";
import { OptionButton } from "../Button/OptionButton";
import { PlayingIcon } from "../PlayingIcon/PlayingIcon";
import { Playlist } from "../../utils/types";
import { AddSongDialog } from "../Dialogs/AddSongDialog";
import styles from "./TrackItem.module.scss";
import { DeviceContext } from "../../context/DeviceContext";

export const TrackItem = (props: {
  index: number;
  playlist: Playlist;
  playlists: Playlist[];
  title: string;
  playlistId: number;
  songId: number;
  interpret: string;
  songLength: string;
  playlistTitle: string;
  isPlaying: boolean;
  isActive: boolean | null;
  onItemClick: () => void;
}): JSX.Element => {
  const [openAddSongDialog, setOpenAddSongDialog] = React.useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMobile = React.useContext(DeviceContext);

  const editOptions =
    props.playlist.playlistName === "All Tracks"
      ? ["add to playlist"]
      : ["remove", "add to playlist"];

  const open = Boolean(anchorEl);

  const handleOpenOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenAddSongDialog = (newValue: boolean): void => {
    setOpenAddSongDialog(newValue);
  };

  const onSelect = (option: string) => {
    handleClose();
    switch (option) {
      case "remove":
        setOpenConfirmDialog(true);
        break;
      case "add to playlist":
        setOpenAddSongDialog(true);
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <div className={styles.wrapper}>
        <div
          className={`${styles.info} ${props.isActive && styles.active}`}
          onClick={() => {
            props.onItemClick();
          }}
        >
          {props.isActive && (
            <PlayingIcon
              playing={(props.isActive ?? false) && props.isPlaying}
            />
          )}
          {!props.isActive && <div className={styles.index}>{props.index}</div>}
          <div
            className={styles.title}
          >{`${props.title} (${props.interpret})`}</div>
          {!isMobile && (
            <div className={styles.duration}>{props.songLength}</div>
          )}
        </div>
        <div className={styles.menu}>
          <OptionButton isOpen={open} handleClick={handleOpenOption} />
          <EditMenu
            anchorEl={anchorEl}
            options={editOptions}
            open={open}
            onClose={handleClose}
            onSelect={onSelect}
          />
          {openConfirmDialog && (
            <ConfirmDialog
              open={openConfirmDialog}
              playlistId={props.playlistId}
              playlistTitle={props.playlistTitle}
              songId={props.songId}
              songTitle={props.title}
              handleClose={(): void => setOpenConfirmDialog(false)}
            />
          )}
          <AddSongDialog
            open={openAddSongDialog}
            currentSongId={props.songId}
            playlists={props.playlists}
            onOpen={handleOpenAddSongDialog}
          />
        </div>
      </div>
    </li>
  );
};
