import { Playlist, Song } from "../../utils/types";
import { Cover } from "./Cover";
import GradeIcon from "@mui/icons-material/Grade";
import "./CurrentlyPlaying.css";
import { AddSongForm } from "../Dialogs/AddSongForm";
import { useAssignSong } from "../../hooks/useAssignSong";
import { useAuthContext } from "../../hooks/useAuthContext";

export const CurrentlyPlaying = (props: {
  currentSong: Song | null;
  playlists: Playlist[];
}): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const postMutationRes = useAssignSong();

  const handleAddToFavorites = (): void => {
    if (props.currentSong) {
      postMutationRes.mutateAsync({
        playlistName: "Favorite",
        songId: props.currentSong.songId,
        userValue: userValue,
      });
    }
  };

  return (
    <div className="currently-playing">
      <div className="currently-playing-image">
        <Cover path={props.currentSong?.songCover} />
      </div>
      <div className="currently-playing-info">
        <h3>{props.currentSong ? props.currentSong.songName : ""}</h3>
        <span>{props.currentSong ? props.currentSong.songArtist : ""}</span>
      </div>
      {props.currentSong && (
        <div className="currently-playing-playlist__control">
          <AddSongForm
            currentSong={props.currentSong}
            playlists={props.playlists}
          />
          <GradeIcon
            className="currently-playing__favorite"
            sx={{ color: "#646464", "&:hover": { color: "#222222" } }}
            onClick={handleAddToFavorites}
          />
        </div>
      )}
    </div>
  );
};
