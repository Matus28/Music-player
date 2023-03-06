import { Song } from "../../utils/types";
import { TrackItem } from "./TrackItem";
import "./TrackList.css";

export const TrackList = (props: {
  data: Song[];
  onSelect: (id: number) => void;
  selectedSong: Song | null;
}): JSX.Element => {
  return (
    <ul className="track-list">
      {props.data &&
        props.data.map((song: Song, index: number) => (
          <TrackItem
            key={song.songId}
            index={index + 1}
            title={song.songTitle}
            interpret={song.songInterpret}
            songLength={song.songLength}
            isActive={
              props.selectedSong && props.selectedSong.songId === song.songId
            }
            onItemClick={() => {
              props.onSelect(song.songId);
            }}
          />
        ))}
    </ul>
  );
};
