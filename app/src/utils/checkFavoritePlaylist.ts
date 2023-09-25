import { Library, PlaylistElement, Song } from "./types";

export const checkFavoritePlaylist = (
  song: any,
  library: Library | undefined
): boolean => {
  if (library && song) {
    const favoritePlaylist: PlaylistElement = library.playlists.filter(
      (element: PlaylistElement) => element.playlistName === "Favorite"
    )[0];

    let result: boolean = false;

    for (let i: number = 0; i < favoritePlaylist.playlistSongs.length; i++) {
      if (favoritePlaylist.playlistSongs[i].songId === song.songId) {
        result = true;
      }
    }

    return result;
  }

  return false;
};
