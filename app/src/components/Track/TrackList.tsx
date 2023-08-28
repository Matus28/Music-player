import { Song } from "../../utils/types";
import { TrackItem } from "./TrackItem";
import styles from "./TrackList.module.scss";

export const TrackList = (props: {
  data: Song[];
  playlistTitle: string;
  playlistId: number;
  isPlaying: boolean;
  selectedSong: Song | null;
  onSelect: (id: number) => void;
  onRemoveSong: (formData: { songId: number }) => void;
}): JSX.Element => {
  return (
    <ul className={styles.list}>
      {props.data &&
        props.data.map((song: Song, index: number) => (
          <TrackItem
            key={song.songId}
            index={index + 1}
            title={song.songName}
            playlistId={props.playlistId}
            songId={song.songId}
            interpret={song.songArtist}
            songLength={song.songLength}
            playlistTitle={props.playlistTitle}
            isPlaying={props.isPlaying}
            isActive={
              props.selectedSong && props.selectedSong.songId === song.songId
            }
            onItemClick={() => {
              props.onSelect(song.songId);
            }}
            onRemoveSong={props.onRemoveSong}
          />
        ))}
    </ul>
  );
};
