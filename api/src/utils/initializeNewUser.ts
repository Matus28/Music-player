import { db } from "../database/connection";
import { eq } from "drizzle-orm";
import { Playlist, playlist } from "../schema/playlist";
import { findUser } from "../services/user.service";

export const initializeNewUser = async (username: string) => {
  const newUser = await findUser(username, "username");
  if (!newUser) {
    throw new Error(`Failed to find user with this username! ${username}`);
  }
  const userId = newUser.userId;

  let exist: Playlist[] = [];
  try {
    exist = await db
      .select()
      .from(playlist)
      .where(eq(playlist.playlistOwner, userId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error(
      "Failed to retrieve user playlist information from the database."
    );
  }

  if (exist.length > 0) {
    throw new Error("Failed to create playlist, playlist already exist.");
  }

  try {
    const result = await db.insert(playlist).values([
      {
        playlistName: "All Tracks",
        playlistOwner: userId,
        playlistDeletable: false,
      },
      {
        playlistName: "Favorite",
        playlistOwner: userId,
        playlistDeletable: false,
      },
    ]);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    throw new Error("Failed to create playlist!");
  }
};
