import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          marginBottom: "1.5rem",
          padding: "2px",
          height: "2.5rem",
          backgroundColor: "#ffffff00",
          "&.MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "1px solid black",
            },
          },
          "&.Mui-error": {
            border: "1px solid black",
          },
          "&:hover fieldset": {
            border: "1px solid black",
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
