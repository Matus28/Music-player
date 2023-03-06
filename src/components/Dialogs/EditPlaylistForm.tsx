import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import { Playlist } from "../../utils/types";
import "./EditPlaylistForm.css";

export const EditPlaylistForm = (props: {
  open: boolean;
  playlist: Playlist;
  playlists: Playlist[];
  handleClose: () => void;
  onUpdatePlaylist: (formValues: {
    playlistId: number;
    playlistName: string;
  }) => void;
}): JSX.Element => {
  const [error, setError] = React.useState<unknown>(null);

  const validateText = (title: string): boolean => {
    let result: boolean = false;
    const alreadyExist = props.playlists.filter(
      (playlist: Playlist) =>
        playlist.playlistTitle.toLocaleLowerCase() ===
          title.toLocaleLowerCase() &&
        playlist.playlistId !== props.playlist.playlistId
    );

    if (title.length < 4) {
      setError("Playlist name must consist of 4 characters at least!");
      result = true;
    } else if (alreadyExist.length > 0) {
      setError("Playlist with the same name already exists!");
      result = true;
    }

    return result;
  };

  const handleCloseDialog = (): void => {
    props.handleClose();
    setError(null);
  };

  const onSubmitHandler = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    const inputPlaylistName = ev.currentTarget.elements.namedItem(
      "playlist-name"
    ) as HTMLInputElement;

    const result = validateText(inputPlaylistName.value);

    if (result) {
      return;
    } else {
      const formValues = {
        playlistId: props.playlist.playlistId,
        playlistName: inputPlaylistName.value,
      };
      props.onUpdatePlaylist(formValues);
      setError(null);
      props.handleClose();
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleCloseDialog}>
        <CustomizedDialogTitle>Edit Playlist</CustomizedDialogTitle>
        <DialogContent>
          <form id="playlist-form" onSubmit={onSubmitHandler}>
            <div className="playlist-form-name">
              <label htmlFor="playlist-name">Playlist name</label>
              <TextField
                className="playlist-form-name"
                variant="outlined"
                fullWidth={true}
                name="playlist-name"
                hiddenLabel={true}
                defaultValue={props.playlist.playlistTitle}
                autoFocus
                required
              />
            </div>
            {error ? <div className="error">{`${error}`}</div> : <div></div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="text" type="submit" form="playlist-form">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
