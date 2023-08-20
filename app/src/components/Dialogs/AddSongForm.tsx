import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import { PlaylistAutocomplete } from "../Autocomplete/PlaylistAutocomplete";
import { Playlist, Song } from "../../utils/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAssignSong } from "../../hooks/useAssignSong";
import "./AddPlaylistForm.css";

export const AddSongForm = (props: {
  currentSong: Song;
  playlists: Playlist[];
}): JSX.Element => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<unknown>(null);
  const [selectedPlaylist, setSelectedPlaylist] =
    React.useState<Playlist | null>(null);

  const { state: userValue } = useAuthContext();

  const postMutationRes = useAssignSong();

  const validateText = (playlistName: string): boolean => {
    let result: boolean = false;

    if (playlistName.length < 4) {
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

    const result = validateText(selectedPlaylist?.playlistName ?? "");

    if (result) {
      return;
    } else {
      const formValues = {
        playlistId: selectedPlaylist?.playlistId ?? -1,
        songId: props.currentSong.songId,
        userValue: userValue,
      };
      postMutationRes.mutateAsync(formValues);
      setError(null);
      setOpen(false);
    }
  };

  const handleSelectedPlaylist = (selectedPlaylist: Playlist): void => {
    setSelectedPlaylist(selectedPlaylist);
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
          <form id="playlist-form" onSubmit={onSubmitHandler}>
            <label htmlFor="playlist-name">Playlist name</label>
            <PlaylistAutocomplete
              onSelectChange={handleSelectedPlaylist}
              playlists={props.playlists}
            />
            {error ? <div className="error">{`${error}`}</div> : <div></div>}
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="text" type="submit" form="playlist-form">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
