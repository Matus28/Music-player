import { Playlist, PlaylistElement, Song } from "./types";

export const processData = {
  getPlaylists(playlists: PlaylistElement[]): Playlist[] {
    return playlists.map((element: PlaylistElement) => {
      return {
        playlistId: element.playlistId,
        playlistName: element.playlistName,
        playlistOwner: element.playlistOwner,
        playlistDeletable: element.playlistDeletable,
      };
    });
  },

  getTrackList(
    allSongs: Song[],
    playlistId: number,
    playlists: PlaylistElement[]
  ): Song[] {
    let result: Song[] = [];

    for (let i: number = 0; i < playlists.length; i++) {
      if (playlists[i].playlistId === playlistId) {
        if (playlists[i].playlistName === "All Tracks") {
          result = allSongs;
        } else {
          result = playlists[i].playlistSongs;
        }
        break;
      }
    }
    return result;
  },
};
