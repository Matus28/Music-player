import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDeletePlaylist } from "../../hooks/useDeletePlaylist";
import { useDeleteAssignedSong } from "../../hooks/useDeleteAssignedSong";
import "./ConfirmDialog.css";

export interface ConfirmDialogProps {
  open: boolean;
  playlistId: number;
  playlistTitle: string;
  songId?: number;
  songTitle?: string;
  handleClose: () => void;
}

export const ConfirmDialog = (props: ConfirmDialogProps): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const deletePlaylistMutationRes = useDeletePlaylist();
  const deleteSongMutationRes = useDeleteAssignedSong();

  const handleCloseDialog = (): void => {
    props.handleClose();
  };

  const onConfirmHandler = (): void => {
    if (props.playlistId && !props.songId) {
      deletePlaylistMutationRes.mutateAsync({
        playlistId: props.playlistId,
        userValue: userValue,
      });
    } else if (props.playlistId && props.songId) {
      deleteSongMutationRes.mutateAsync({
        playlistId: props.playlistId,
        songId: props.songId,
        userValue: userValue,
      });
    }
    handleCloseDialog();
  };
  const messageRemPlaylist = (
    <p className="multi-liner">
      Playlist to remove: <b>{props.playlistTitle}</b>
    </p>
  );
  const messageRemSong = (
    <p className="multi-liner">
      Song to remove: <b>{props.songTitle}</b>
      <br></br> From playlist: <b>{props.playlistTitle}</b>
    </p>
  );

  return (
    <div className="confirm-dialog">
      <Dialog open={props.open} onClose={handleCloseDialog}>
        <CustomizedDialogTitle>Confirmation</CustomizedDialogTitle>
        <DialogContent>
          {props.songTitle ? messageRemSong : messageRemPlaylist}
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button variant="text" onClick={onConfirmHandler}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
