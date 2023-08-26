import { eq } from "drizzle-orm";
import { db } from "../database/connection";
import { song } from "../schema/song";

export const updateSong = async (songToUpdate: SongDriveData): Promise<any> => {
  try {
    const result = await db
      .update(song)
      .set({
        songDriveId: songToUpdate.id,
        songUrl: songToUpdate.url,
        songCover: songToUpdate.cover,
      })
      .where(eq(song.songFile, songToUpdate.name));
  } catch (error) {
    console.log(`Data not updated in the Database!`);
    console.error(error);
    return;
  }
};
