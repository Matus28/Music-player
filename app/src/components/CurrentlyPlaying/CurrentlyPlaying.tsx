import { Playlist, Song } from "../../utils/types";
import { Cover } from "./Cover";
import GradeIcon from "@mui/icons-material/Grade";
import { AddSongForm } from "../Dialogs/AddSongForm";
import { useAssignSong } from "../../hooks/useAssignSong";
import { useAuthContext } from "../../hooks/useAuthContext";
import styles from "./CurrentlyPlaying.module.scss";
import { useDeleteAssignedSong } from "../../hooks/useDeleteAssignedSong";

export const CurrentlyPlaying = (props: {
  currentSong: Song | null;
  playlists: Playlist[];
  isFavorite: boolean;
}): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const postMutationRes = useAssignSong();
  const deleteMutationRes = useDeleteAssignedSong();

  const handleAddToFavorites = (): void => {
    if (!props.currentSong) {
      return;
    }

    const data = {
      playlistName: "Favorite",
      songId: props.currentSong.songId,
      userValue: userValue,
    };

    if (!props.isFavorite) {
      postMutationRes.mutateAsync(data);
    } else {
      deleteMutationRes.mutateAsync(data);
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
            currentSongId={props.currentSong.songId}
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
