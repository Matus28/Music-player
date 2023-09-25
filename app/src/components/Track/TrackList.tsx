import * as React from "react";
import { Playlist, Song } from "../../utils/types";
import { TrackItem } from "./TrackItem";
import styles from "./TrackList.module.scss";

export const TrackList = (props: {
  data: Song[];
  playlist: Playlist;
  isPlaying: boolean;
  selectedSong: Song | null;
  playingPlaylistId: number | null;
  onSelect: (id: number, playlistId: number) => void;
  onRemoveSong: (formData: { songId: number }) => void;
}): JSX.Element => {
  console.log("&&&&&&&&&&&&&&&& Selected Song &&&&&&&&&&&&&&&&&");
  console.log(props.selectedSong);
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
  return (
    <ul className={styles.list}>
      {props.data &&
        props.data.map((song: Song, index: number) => (
          <TrackItem
            key={song.songId}
            index={index + 1}
            title={song.songName}
            playlistId={props.playlist.playlistId}
            playlistTitle={props.playlist.playlistName}
            songId={song.songId}
            interpret={song.songArtist}
            songLength={song.songLength}
            isPlaying={props.isPlaying}
            isActive={
              props.selectedSong &&
              props.selectedSong.songId === song.songId &&
              props.playlist.playlistId === props.playingPlaylistId
            }
            onItemClick={() => {
              props.onSelect(index, props.playlist.playlistId);
            }}
            onRemoveSong={props.onRemoveSong}
          />
        ))}
    </ul>
  );
};
