import { Playlist, Song } from "../../utils/types";
import { Cover } from "./Cover";
import GradeIcon from "@mui/icons-material/Grade";
import { AddSongForm } from "../Dialogs/AddSongForm";
import { useAssignSong } from "../../hooks/useAssignSong";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./CurrentlyPlaying.module.scss";

export const CurrentlyPlaying = (props: {
  currentSong: Song | null;
  playlists: Playlist[];
  isFavorite: boolean;
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
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <Cover path={props.currentSong?.songCover} />
      </div>
      <div className={styles.info}>
        <h3>{props.currentSong ? props.currentSong.songName : ""}</h3>
        <span>{props.currentSong ? props.currentSong.songArtist : ""}</span>
      </div>
      {props.currentSong && (
        <div
          className={`${styles.controls} ${
            props.isFavorite ? styles.active : ""
          }`}
        >
          <AddSongForm
            currentSong={props.currentSong}
            playlists={props.playlists}
          />
          <GradeIcon
            className={styles.favorite}
            onClick={handleAddToFavorites}
          />
        </div>
      )}
    </div>
  );
};
