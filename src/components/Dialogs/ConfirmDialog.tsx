import * as React from "react";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { CustomizedDialogTitle } from "./CustomizedDialogComponents";
import {
  PlaylistsContext,
  PlaylistsContextType,
} from "../../context/PlaylistsContext";
import "./ConfirmDialog.css";

export interface ConfirmDialogProps {
  open: boolean;
  playlistId?: number;
  playlistTitle: string;
  songTitle?: string;
  handleClose: () => void;
}

export const ConfirmDialog = (props: ConfirmDialogProps): JSX.Element => {
  const { removePlaylist } = React.useContext(
    PlaylistsContext
  ) as PlaylistsContextType;

  const handleCloseDialog = (): void => {
    props.handleClose();
  };

  const onConfirmHandler = (): void => {
    if (props.playlistId) {
      removePlaylist(props.playlistId);
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
