import * as React from "react";
import { Playlist, Song } from "../../utils/types";
import { TrackItem } from "./TrackItem";
import styles from "./TrackList.module.scss";
import { DeviceContext } from "../../context/DeviceContext";

export const TrackList = (props: {
  data: Song[];
  playlist: Playlist;
  playlists: Playlist[];
  isPlaying: boolean;
  selectedSong: Song | null;
  playingPlaylistId: number | null;
  onSelect: (id: number, playlistId: number) => void;
}): JSX.Element => {
  const isMobile = React.useContext(DeviceContext);

  return (
    <>
      {isMobile && (
        <div className={styles.header}>
          <h2>{props.playlist.playlistName}</h2>
        </div>
      )}
      <ul className={styles.list}>
        {props.data &&
          props.data.map((song: Song, i: number) => (
            <TrackItem
              key={song.songId}
              index={i + 1}
              playlist={props.playlist}
              playlists={props.playlists}
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
                props.onSelect(i, props.playlist.playlistId);
              }}
            />
          ))}
      </ul>
    </>
  );
};
