import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { Playlist, playlist } from "../schema/playlist";
import { assignedSong } from "../schema/assignedSong";
import { song } from "../schema/song";
import { processLibraryData } from "../utils/processLibraryData";

export type LibraryData = {
  playlistId: number | null;
  playlistName: string | null;
  playlistOwner: number | null;
  playlistDeletable: boolean | null;
  songId: number;
  songDriveId: string | null;
  songName: string | null;
  songArtist: string | null;
  songUrl: string | null;
  songCover: string | null;
  songLength: string | null;
};

export const getLibraryService = async (ownerId: number) => {
  let allPlaylists: Playlist[] = [];
  try {
    allPlaylists = await db
      .select()
      .from(playlist)
      .where(eq(playlist.playlistOwner, ownerId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  let library: LibraryData[] = [];
  try {
    library = await db
      .select({
        playlistId: playlist.playlistId,
        playlistName: playlist.playlistName,
        playlistOwner: playlist.playlistOwner,
        playlistDeletable: playlist.playlistDeletable,
        songId: assignedSong.songId,
        songDriveId: song.songDriveId,
        songName: song.songName,
        songArtist: song.songArtist,
        songUrl: song.songUrl,
        songCover: song.songCover,
        songLength: song.songLength,
      })
      .from(assignedSong)
      .leftJoin(playlist, eq(assignedSong.playlistId, playlist.playlistId))
      .leftJoin(song, eq(assignedSong.songId, song.songId))
      .where(eq(playlist.playlistOwner, ownerId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  const result = processLibraryData(allPlaylists, library);

  return result;
};
