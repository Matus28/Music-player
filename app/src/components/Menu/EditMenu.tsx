import { Menu, MenuItem, Typography } from "@mui/material";
import { OptionIcon } from "./OptionIcon";
import { Playlist, Song } from "../../utils/types";

interface EditMenuProps {
  anchorEl: HTMLElement | null;
  options: string[];
  open: boolean;
  onClose: () => void;
  onSelect: (option: string) => void;
}

export const EditMenu = (props: EditMenuProps): JSX.Element => {
  return (
    <Menu anchorEl={props.anchorEl} open={props.open} onClose={props.onClose}>
      {props.options &&
        props.options.map((option: string, index: number) => (
          <MenuItem key={index} onClick={(): void => props.onSelect(option)}>
            <OptionIcon key={index} option={option} />
            <Typography variant="inherit">{option}</Typography>
          </MenuItem>
        ))}
    </Menu>
  );
};
