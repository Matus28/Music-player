import * as React from "react";
import { playlistData } from "../mockdata/playlists";
import { Playlist, Song } from "../utils/types";

// export type PlaylistsContextType = {
//   playlists: Playlist[];
//   addPlaylist: (formData: { playlistName: string }) => void;
//   editPlaylist: (formData: {
//     playlistId: number;
//     playlistName: string;
//   }) => void;
//   removePlaylist: (playlistId: number) => void;
//   addToPlaylist: (formData: { playlistName: string; song: Song }) => void;
// };

// export const PlaylistsContext =
//   React.createContext<PlaylistsContextType | null>(null);

// export const PlaylistsProvider = (props: {
//   children: React.ReactNode;
// }): JSX.Element => {
//   const [playlists, setPlaylists] = React.useState<Playlist[]>(playlistData);

//   const addPlaylist = (formData: { playlistName: string }): void => {
//     const newPlaylist: Playlist = {
//       playlistId: playlists.length + 1,
//       playlistName: formData.playlistName,
//       playlistOwner: "007",
//       playlistDeletable: true,
//     };
//     setPlaylists([...playlists, newPlaylist]);
//   };

//   const editPlaylist = (formData: {
//     playlistId: number;
//     playlistName: string;
//   }): void => {
//     const newPlaylists = playlists.map((playlist: Playlist) => {
//       if (playlist.playlistId === formData.playlistId) {
//         playlist.playlistName = formData.playlistName;
//       }
//       return playlist;
//     });
//     setPlaylists(newPlaylists);
//   };

//   const removePlaylist = (playlistId: number): void => {
//     const newPlaylists = playlists.filter(
//       (playlist: Playlist) => playlist.playlistId !== playlistId
//     );
//     setPlaylists(newPlaylists);
//   };

//   const addToPlaylist = (formData: {
//     playlistName: string;
//     song: Song;
//   }): void => {
//     console.log(`Add "${formData.song.songName}" to: ${formData.playlistName}`);
//   };

//   return (
//     <PlaylistsContext.Provider
//       value={{
//         playlists: playlists,
//         addPlaylist,
//         editPlaylist,
//         removePlaylist,
//         addToPlaylist,
//       }}
//     >
//       {props.children}
//     </PlaylistsContext.Provider>
//   );
// };
