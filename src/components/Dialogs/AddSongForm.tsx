import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import { PlaylistAutocomplete } from "../Autocomplete/PlaylistAutocomplete";
import { Playlist, Song } from "../../utils/types";
import "./AddSongForm.css";
import {
  PlaylistsContext,
  PlaylistsContextType,
} from "../../context/PlaylistsContext";

export const AddSongForm = (props: { currentSong: Song }): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);
  const [selectedPlaylist, setSelectedPlaylist] = React.useState<string>("");

  const { addToPlaylist } = React.useContext(
    PlaylistsContext
  ) as PlaylistsContextType;

  const validateText = (title: string): boolean => {
    let result: boolean = false;

    if (title.length < 4) {
      setError("Playlist name must consist of 4 characters at least!");
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
        playlistName: inputPlaylistName.value,
        song: props.currentSong,
      };
      addToPlaylist(formValues);
      setError(null);
      setOpen(false);
    }
  };

  const handleSelectedPlaylist = (playlistTitle: string): void => {
    setSelectedPlaylist(playlistTitle);
  };

  return (
    <div>
      <AddIcon
        className="currently-playing__add"
        sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        onClick={handleOpenDialog}
      />
      <Dialog open={open} onClose={handleCloseDialog}>
        <CustomizedDialogTitle>Add to playlist</CustomizedDialogTitle>
        <DialogContent>
          <form id="song-form" onSubmit={onSubmitHandler}>
            <div className="playlist-form-name">
              <label htmlFor="playlist-name">Playlist name</label>
              <PlaylistAutocomplete onSelectChange={handleSelectedPlaylist} />
            </div>
            {error ? <div className="error">{`${error}`}</div> : <div></div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="text" type="submit" form="song-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
