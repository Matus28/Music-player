import { Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export interface OptionButtonProps {
  isOpen: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const OptionButton = (props: OptionButtonProps): JSX.Element => {
  return (
    <>
      <Button
        id="basic-button"
        aria-controls={props.isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={props.isOpen ? "true" : undefined}
        onClick={props.handleClick}
      >
        <MoreVertIcon
          className="song__option"
          sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
        />
      </Button>
    </>
  );
};
