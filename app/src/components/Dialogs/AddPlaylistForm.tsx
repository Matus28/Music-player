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
import "./AddPlaylistForm.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { usePostPlaylist } from "../../hooks/usePostPlaylist";

export const AddPlaylistForm = (props: {
  playlists: Playlist[];
}): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);

  const { state: userValue } = useAuthContext();

  const postMutationRes = usePostPlaylist();

  const validateText = (title: string): boolean => {
    let result: boolean = false;
    const alreadyExist = props.playlists.filter(
      (playlist: Playlist) =>
        playlist.playlistName.toLocaleLowerCase() === title.toLocaleLowerCase()
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

  const handleOpenDialog = (): void => {
    setOpen(true);
  };

  const handleCloseDialog = (): void => {
    setOpen(false);
    setError(null);
  };

  const submitHandler = (ev: React.FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();

    const inputPlaylistName = ev.currentTarget.elements.namedItem(
      "playlist-name"
    ) as HTMLInputElement;

    const result = validateText(inputPlaylistName.value);

    if (result) {
      return;
    } else {
      const formData = {
        playlistName: inputPlaylistName.value,
        userValue: userValue,
      };
      postMutationRes.mutateAsync(formData);
      setError(null);
      setOpen(false);
    }
  };

  return (
    <div>
      <AddIcon
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        className="playlist-list-header__add"
        onClick={handleOpenDialog}
      />
      <Dialog open={open} onClose={handleCloseDialog}>
        <CustomizedDialogTitle>Create Playlist</CustomizedDialogTitle>
        <DialogContent>
          <form id="playlist-form" onSubmit={submitHandler}>
            <label htmlFor="playlist-name">Playlist name</label>
            <TextField
              className="playlist-form-name"
              variant="outlined"
              fullWidth={true}
              name="playlist-name"
              hiddenLabel={true}
              placeholder="Name"
              autoFocus
              required
            />
            {error ? <div className="error">{`${error}`}</div> : <div></div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="text" type="submit" form="playlist-form">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
