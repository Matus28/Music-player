import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          margin: "8px",
          height: "30px",
          width: "230px",
          backgroundColor: "#eee",
          "&.MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "2px solid #045db6",
            },
          },
          "&.Mui-error": {
            border: "2px solid #ff6161",
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
        data-testid={props.name}
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
        // error={props.value === ""}
        // helperText={props.value === "" ? "Empty field!" : " "}
      />
    </ThemeProvider>
  );
};
