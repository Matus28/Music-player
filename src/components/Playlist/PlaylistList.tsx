import { Playlist } from "../../utils/types";
import { PlaylistItem } from "./PlaylistItem";
import "./PlaylistList.css";
import { AddPlaylistForm } from "../Dialogs/AddPlaylistForm";

export const PlaylistList = (props: {
  data: Playlist[];
  selectedPlaylist: Playlist | null;
  onSelect: (id: number) => void;
  onAddPlaylist: (formData: { playlistName: string }) => void;
  onEditPlaylist: (formData: {
    playlistId: number;
    playlistName: string;
  }) => void;
  onRemovePlaylist: (formData: { playlistId: number }) => void;
}): JSX.Element => {
  return (
    <div className="playlist-list">
      <div className="playlist-list-header">
        <h2>Playlists</h2>
        <AddPlaylistForm
          playlists={props.data}
          onPostPlaylist={props.onAddPlaylist}
        />
      </div>
      <ul className="playlist-list">
        {props.data &&
          props.data.map((playlist: Playlist) => (
            <PlaylistItem
              key={playlist.playlistId}
              playlist={playlist}
              playlists={props.data}
              isActive={
                props.selectedPlaylist
                  ? props.selectedPlaylist.playlistId === playlist.playlistId
                  : false
              }
              onItemClick={() => {
                props.onSelect(playlist.playlistId);
              }}
              onEditPlaylist={props.onEditPlaylist}
              onRemovePlaylist={props.onRemovePlaylist}
            />
          ))}
      </ul>
    </div>
  );
};
