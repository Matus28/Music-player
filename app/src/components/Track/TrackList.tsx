import { Song } from "../../utils/types";
import { TrackItem } from "./TrackItem";
import "./TrackList.css";

export const TrackList = (props: {
  data: Song[];
  playlistTitle: string;
  playlistId: number;
  onSelect: (id: number) => void;
  selectedSong: Song | null;
  onRemoveSong: (formData: { songId: number }) => void;
}): JSX.Element => {
  return (
    <ul className="track-list">
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
