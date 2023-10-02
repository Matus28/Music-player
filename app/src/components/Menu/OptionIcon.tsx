import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { ListItemIcon } from "@mui/material";
import { Playlist, Song } from "../../utils/types";

export const OptionIcon = (props: {
  option: string;
  songId?: number;
  playlists?: Playlist[];
}): JSX.Element => {
  return (
    <ListItemIcon>
      {props.option === "remove" && <DeleteOutlineIcon />}
      {props.option === "edit" && <EditIcon />}
      {props.option === "add to playlist" && <AddIcon />}
    </ListItemIcon>
  );
};
