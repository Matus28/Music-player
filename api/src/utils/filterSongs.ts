import { db } from "../database/connection";
import { Song, song } from "../schema/song";

export const filterSongs = async (
  songList: SongDriveData[]
): Promise<SongDriveData[]> => {
  let result: SongDriveData[] = [];
  let songsFromDB: Song[] = [];

  try {
    const allSongs: Song[] = await db.select().from(song);
    songsFromDB = allSongs;
  } catch (error: unknown) {
    console.error("Problem at reaching data from Database!");
  }

  if (songsFromDB.length === 0) {
    return songList;
  }
  result = songList.filter((song: SongDriveData) => {
    for (let i: number = 0; i < songsFromDB.length; i++) {
      if (song.id === songsFromDB[i]?.songDriveId) return false;
      if (i === songsFromDB.length - 1) return true;
    }
  });

  return result;
};
