import { db } from "../database/connection";
import { NewSong, song } from "../schema/song";

export const addSongs = async (songList: NewSong[]): Promise<any> => {
  try {
    const result = await db.insert(song).values(songList);
  } catch (error) {
    console.log(`Data not added to the Database!`);
    console.error(error);
    return;
  }
};
