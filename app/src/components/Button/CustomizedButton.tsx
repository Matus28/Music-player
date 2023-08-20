import { Button, ButtonProps, styled } from "@mui/material";

export const BlueStyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText("#000000"),
  fontFamily: "Ubuntu, sans-serif",
  textTransform: "none",
  backgroundColor: "#0e5066",
  boxShadow: "2px 2px 5px -2px rgba(0,0,0,0.75)",
  fontSize: "20px",
  letterSpacing: "1px",
  fontWeight: "500",
  border: "1px solid #045db6",
  borderRadius: "10px",
  height: "50px",
  width: "100px",
  "&:active": {
    backgroundColor: "#045db66b",
    color: "#ffffff",
  },
  "&:hover": {
    backgroundColor: "#0b5687",
    color: "#ffffff",
  },
  "&:disabled": {
    backgroundColor: "#090b0c42",
    color: "#ffffff2b",
  },
}));

// eslint-disable-next-line
export const CircleButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: "#007fff",
  backgroundColor: "#f3f5f5",
  boxShadow: "2px 2px 5px -2px rgba(0,0,0,0.75)",
  fontSize: "35px",
  fontWeight: "800",
  minWidth: "3px",
  margin: "0",
  padding: "0",
  border: "1px solid #045db6",
  borderRadius: "50%",
  "&:active": {
    backgroundColor: "#dcdddd",
    color: "#007fff",
  },
  "&:hover": {
    backgroundColor: "#dcdddd",
    color: "#007fff",
  },
}));
