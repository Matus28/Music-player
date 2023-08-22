import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          margin: "6px",
          padding: "2px",
          height: "30px",
          width: "230px",
          backgroundColor: "#eee",
          "&.MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid black",
            },
          },
          "&.Mui-error": {
            border: "2px solid black",
          },
          "&:hover fieldset": {
            border: "none",
          },
        },
      },
    },
  },
});

export const CustomizedTextField = (props: {
  type: string;
  value: string;
  name: string;
  isError?: boolean;
  onChange: (newValue: string) => void;
}): JSX.Element => {
  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.onChange(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <TextField
        size="small"
        variant="outlined"
        type={props.type}
        name={props.name}
        error={props.isError}
        InputLabelProps={{
          shrink: true,
        }}
        required
        value={props.value}
        onChange={onChangeHandler}
      />
    </ThemeProvider>
  );
};
