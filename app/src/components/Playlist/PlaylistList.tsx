import { Playlist } from "../../utils/types";
import { PlaylistItem } from "./PlaylistItem";
import "./PlaylistList.css";
import { AddPlaylistForm } from "../Dialogs/AddPlaylistForm";

export const PlaylistList = (props: {
  playlists: Playlist[];
  selectedPlaylist: Playlist | null;
  onSelect: (id: number) => void;
}): JSX.Element => {
  return (
    <div className="playlist-list">
      <div className="playlist-list-header">
        <h2>Playlists</h2>
        <AddPlaylistForm playlists={props.playlists} />
      </div>
      <ul className="playlist-list">
        {props.playlists &&
          props.playlists.map((playlist: Playlist) => (
            <PlaylistItem
              key={playlist.playlistId}
              playlists={props.playlists}
              playlist={playlist}
              isActive={
                props.selectedPlaylist
                  ? props.selectedPlaylist.playlistId === playlist.playlistId
                  : false
              }
              onItemClick={(): void => {
                props.onSelect(playlist.playlistId);
              }}
            />
          ))}
      </ul>
    </div>
  );
};
