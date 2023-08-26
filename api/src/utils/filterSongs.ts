import { db } from "../database/connection";
import { Song, song } from "../schema/song";

export const filterSongs = async (
  songList: SongDriveData[]
): Promise<FilteredResult> => {
  let result: FilteredResult = { toAdd: [], toUpdate: [] };
  let songsFromDB: Song[] = [];

  try {
    const allSongs: Song[] = await db.select().from(song);
    songsFromDB = allSongs;
  } catch (error: unknown) {
    console.error("Problem at reaching data from Database!");
  }

  if (songsFromDB.length === 0) {
    return { toAdd: songList, toUpdate: [] };
  }

  result = compareSongs(songsFromDB, songList);

  return result;
};

const compareSongs = (
  songsFromDB: Song[],
  songsFromDrive: SongDriveData[]
): FilteredResult => {
  const result: FilteredResult = {
    toAdd: [],
    toUpdate: [],
  };

  for (const songFromDrive of songsFromDrive) {
    const matchingSong = songsFromDB.find((songFromDB) => {
      if (songFromDrive.name === songFromDB.songFile) {
        if (
          songFromDrive.id !== songFromDB.songDriveId ||
          songFromDrive.url !== songFromDB.songUrl ||
          songFromDrive.cover !== songFromDB.songCover
        ) {
          result.toUpdate.push(songFromDrive);
        }
        return songFromDB;
      }
    });

    if (matchingSong) {
      continue;
    }

    result.toAdd.push(songFromDrive);
  }

  return result;
};
