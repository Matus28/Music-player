export type Playlist = {
  playlistId: number;
  playlistName: string;
  playlistOwner: number;
  playlistDeletable: boolean;
};

export type Song = {
  songId: number;
  songFile: string;
  songName: string;
  songArtist: string;
  songUrl: string;
  songCover?: string;
  songLength: string;
};

export type User = {
  email: string;
  token: string;
};

export type PlaylistElement = Playlist & {
  playlistSongs: Song[];
};

export type Library = {
  playlists: PlaylistElement[];
};
