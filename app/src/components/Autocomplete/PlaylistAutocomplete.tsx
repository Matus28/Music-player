import * as React from "react";
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  CircularProgress,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { Playlist } from "../../utils/types";

export const PlaylistAutocomplete = (props: {
  onSelectChange: (playlist: Playlist) => void;
  playlists: Playlist[];
}): JSX.Element => {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const playlistChangeHandle = (
    _: React.SyntheticEvent,
    value: Playlist | null
  ): void => {
    if (value) {
      props.onSelectChange(value);
    }
  };

  return (
    <>
      {props.playlists && (
        <Autocomplete
          className="playlist-select-autocomplete"
          size="small"
          fullWidth
          onChange={playlistChangeHandle}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.playlistName === value.playlistName
          }
          getOptionLabel={(option) => option.playlistName}
          options={props.playlists}
          loading={isLoading}
          renderOption={(
            props: React.HTMLAttributes<HTMLLIElement>,
            option: Playlist
          ) => (
            <Box component="li" key={Math.random()} {...props}>
              {option.playlistName}
            </Box>
          )}
          renderInput={(params: AutocompleteRenderInputParams) => (
            <TextField
              {...params}
              hiddenLabel={true}
              name="playlist-name"
              className="playlist-form-name"
              required
              autoFocus
              sx={{ height: "90px" }}
              placeholder="Playlist"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
                className: "playlist-form-name__autocompleteinput",
              }}
            />
          )}
        />
      )}
    </>
  );
};
