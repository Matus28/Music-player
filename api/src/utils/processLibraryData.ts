import { LibraryData } from "../services/library.service";
import { Playlist } from "../schema/playlist";
import { Song } from "../schema/song";

export const processLibraryData = (
  playlists: Playlist[],
  libraryData: LibraryData[]
): Library => {
  const playlistLibrary: PlaylistElement[] = [];

  for (let i: number = 0; i < playlists.length; i++) {
    const songs: Song[] = [];
    const filteredSongs = libraryData.filter(
      (element: LibraryData) => element.playlistId === playlists[i]?.playlistId
    );
    for (let j: number = 0; j < filteredSongs.length; j++) {
      songs.push({
        songId: filteredSongs[j]?.songId ?? -1,
        songDriveId: filteredSongs[j]?.songDriveId ?? "",
        songName: filteredSongs[j]?.songName ?? "",
        songArtist: filteredSongs[j]?.songArtist ?? "",
        songUrl: filteredSongs[j]?.songUrl ?? "",
        songCover: filteredSongs[j]?.songCover ?? "",
        songLength: filteredSongs[j]?.songLength ?? "",
      });
    }
    playlistLibrary.push({
      playlistId: playlists[i]?.playlistId ?? -1,
      playlistName: playlists[i]?.playlistName ?? "",
      playlistOwner: playlists[i]?.playlistOwner ?? -1,
      playlistDeletable: playlists[i]?.playlistDeletable ?? true,
      playlistSongs: songs,
    });
  }

  return { playlists: playlistLibrary };
};
