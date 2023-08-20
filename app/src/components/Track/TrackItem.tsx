import * as React from "react";
import { EditMenu } from "../Menu/EditMenu";
import { ConfirmDialog } from "../Dialogs/ConfirmDialog";
import { OptionButton } from "../Button/OptionButton";
import "./TrackItem.css";

export const TrackItem = (props: {
  index: number;
  title: string;
  playlistId: number;
  songId: number;
  interpret: string;
  songLength: string;
  playlistTitle: string;
  isActive: boolean | null;
  onItemClick: () => void;
  onRemoveSong: (formData: { songId: number }) => void;
}): JSX.Element => {
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const status = props.isActive ? "active" : "";
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onSelect = (option: string) => {
    handleClose();
    switch (option) {
      case "remove":
        setOpenConfirmDialog(true);
        break;
      default:
        break;
    }
  };

  return (
    <li>
      <div className="track-item">
        <div
          className={`track-item-info ${status}`}
          onClick={() => {
            props.onItemClick();
          }}
        >
          <div className="track-item__index">{props.index}</div>
          <div className="track-item__title">{`${props.title} (${props.interpret})`}</div>
          <div className="track-item__length">{props.songLength}</div>
        </div>
        <div className="track-item-menu">
          <OptionButton isOpen={open} handleClick={handleClick} />
          <EditMenu
            anchorEl={anchorEl}
            options={["remove"]}
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
        </div>
      </div>
    </li>
  );
};
