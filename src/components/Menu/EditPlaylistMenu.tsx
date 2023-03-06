import * as React from "react";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  MenuList,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const ITEM_HEIGHT = 48;

interface EditPlaylistMenuProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

export const EditPlaylistMenu = (props: EditPlaylistMenuProps): JSX.Element => {
  return (
    <div className="playlist-edit-menu">
      <Menu anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
        <MenuItem onClick={(): void => props.onSelect("edit")}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <Typography variant="inherit">edit</Typography>
        </MenuItem>
        <MenuItem onClick={(): void => props.onSelect("remove")}>
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <Typography variant="inherit">remove</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};
