export type Playlist = {
  playlistId: number;
  playlistTitle: string;
  playlistAuthorId: string;
  playlistIsDeletable: boolean;
};

export type Song = {
  songId: number;
  songTitle: string;
  songInterpret: string;
  songPath: string;
  songCoverUrl?: string;
  songLength: string;
};
