import { Button, ButtonProps, styled } from "@mui/material";

export const BlueStyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#ffffff"),
  fontFamily: "Ubuntu, sans-serif",
  textTransform: "none",
  backgroundColor: "#ffffff",
  boxShadow: "2px 2px 5px -2px rgba(0,0,0,0.75)",
  fontSize: "20px",
  letterSpacing: "1px",
  fontWeight: "500",
  border: "1px solid gray",
  borderRadius: "10px",
  height: "50px",
  width: "100px",
  "&:active": {
    backgroundColor: "#0b5687",
    color: "#ffffff",
  },
  "&:hover": {
    backgroundColor: "#0b5687",
    color: "#ffffff",
  },
  "&:disabled": {
    backgroundColor: "#0b5687",
    color: "#ffffff2b",
  },
}));
