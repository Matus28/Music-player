import { Song } from "../schema/song";

export {};

declare global {
  interface SongDriveData {
    id: string;
    name: string;
    url: string;
    download: string;
    folders: Array<string | null | undefined>;
    cover: string;
  }

  interface FilteredResult {
    toAdd: SongDriveData[];
    toUpdate: SongDriveData[];
  }

  interface Metadata {
    name: string;
    author: string;
    duration: string;
  }

  interface SongData {
    songDriveId: string;
    songFile: string;
    songName: string;
    songArtist: string;
    songUrl: string;
    songCover: string;
    songLength: string;
  }

  interface UserId {
    userId: number;
  }

  namespace Express {
    export interface Request {
      user?: UserId;
    }
  }

  namespace Express {
    export interface Response {
      message?: string;
    }
  }

  export type PlaylistElement = {
    playlistId: number;
    playlistName: string;
    playlistOwner: number;
    playlistDeletable: boolean;
    playlistSongs: Song[];
  };

  export type Library = {
    playlists: PlaylistElement[];
  };
}
