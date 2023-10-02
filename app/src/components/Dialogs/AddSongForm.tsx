import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Playlist, Song } from "../../utils/types";
import styles from "./AddSongForm.module.scss";
import { AddSongDialog } from "./AddSongDialog";

export const AddSongForm = (props: {
  currentSongId: number;
  playlists: Playlist[];
}): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);

  const handleOpenDialog = (): void => {
    setOpen(true);
  };

  const handleOpen = (newValue: boolean): void => {
    setOpen(newValue);
  };

  return (
    <div className={styles.add}>
      <AddIcon className="currently-playing__add" onClick={handleOpenDialog} />
      <AddSongDialog
        open={open}
        currentSongId={props.currentSongId}
        playlists={props.playlists}
        onOpen={handleOpen}
      />
    </div>
  );
};
