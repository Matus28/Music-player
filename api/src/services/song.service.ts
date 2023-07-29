import { db } from "../database/connection";
import { Song, song } from "../schema/song";

export const getAllSongsService = async () => {
  try {
    const result: Song[] = await db.select().from(song);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
