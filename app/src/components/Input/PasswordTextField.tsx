import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormHelperText } from "@mui/material";

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "30px",
          padding: "0px",
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
            border: "1px solid #ff6161",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontWeight: "800",
          fontSize: "15px",
          lineHeight: "15px",
        },
      },
    },
  },
});

export function PasswordTextField(props: {
  value: string;
  name: string;
  isNotSame?: boolean;
  onChange: (newValue: string) => void;
}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    props.onChange(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="password-input">
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name={props.name}
            value={props.value}
            error={props.isNotSame === true}
            onChange={onChangeHandler}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
          />
          {props.isNotSame && (
            <FormHelperText error id="password-match-error">
              {"Passwords do not match."}
            </FormHelperText>
          )}
        </FormControl>
      </div>
    </ThemeProvider>
  );
}
