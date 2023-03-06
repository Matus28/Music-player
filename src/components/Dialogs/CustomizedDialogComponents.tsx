import { DialogTitle, DialogContentText, styled, Switch } from "@mui/material";

export const CustomizedDialogTitle = styled(DialogTitle)`
  font-size: 21px;
  text-align: center;
  font-weight: 700;
  letter-spacing: 2px;
`;

export const CustomizedContentText = styled(DialogContentText)`
  text-align: center;
  font-size: 18px;
  color: #000000;
  padding-bottom: 1rem;
  border-bottom: 1px solid #000000;
`;

export const BlueSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#63b1ff",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#63b1ff",
  },
}));
