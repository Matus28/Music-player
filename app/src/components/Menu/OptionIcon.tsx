import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { ListItemIcon } from "@mui/material";

export const OptionIcon = (props: { option: string }): JSX.Element => {
  return (
    <ListItemIcon>
      {props.option === "remove" && <DeleteOutlineIcon />}
      {props.option === "edit" && <EditIcon />}
    </ListItemIcon>
  );
};
