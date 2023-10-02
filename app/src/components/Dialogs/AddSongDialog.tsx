import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import styles from "./AddSongDialog.module.scss";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import { PlaylistAutocomplete } from "../Autocomplete/PlaylistAutocomplete";
import { Playlist } from "../../utils/types";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAssignSong } from "../../hooks/useAssignSong";

export const AddSongDialog = (props: {
  open: boolean;
  currentSongId: number;
  playlists: Playlist[];
  onOpen: (newValue: boolean) => void;
}): JSX.Element => {
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

  const handleCloseDialog = (): void => {
    props.onOpen(false);
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
        songId: props.currentSongId,
        userValue: userValue,
      };
      postMutationRes.mutateAsync(formValues);
      setError(null);
      props.onOpen(false);
    }
  };

  const handleSelectedPlaylist = (selectedPlaylist: Playlist): void => {
    setSelectedPlaylist(selectedPlaylist);
  };

  return (
    <Dialog open={props.open} onClose={handleCloseDialog}>
      <CustomizedDialogTitle>Add to playlist</CustomizedDialogTitle>
      <DialogContent>
        <form id="song-form" onSubmit={onSubmitHandler}>
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
        <Button variant="text" type="submit" form="song-form">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
