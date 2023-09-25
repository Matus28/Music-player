import { and, eq } from "drizzle-orm";
import { db } from "../database/connection";
import { Playlist, playlist } from "../schema/playlist";
import { Song, song } from "../schema/song";
import { AssignedSong, assignedSong } from "../schema/assignedSong";

export const getAllPlaylistsService = async (ownerId: number) => {
  try {
    const result: Playlist[] = await db
      .select()
      .from(playlist)
      .where(eq(playlist.playlistOwner, ownerId));
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const createPlaylistService = async (
  ownerId: number,
  playlistName: string
) => {
  let exist: Playlist[] = [];
  try {
    exist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistName, playlistName)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (exist.length > 0) {
    throw new Error("Playlist with this name already exist!");
  }

  try {
    const result = await db.insert(playlist).values({
      playlistName: playlistName,
      playlistOwner: ownerId,
      playlistDeletable: true,
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const updatePlaylistService = async (
  ownerId: number,
  playlistId: number,
  playlistName: string
) => {
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistId, playlistId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Playlist with this ID does not exist!");
  }

  let duplicateExist: Playlist[] = [];
  try {
    duplicateExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistName, playlistName)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (duplicateExist.length > 0) {
    throw new Error("Playlist with this name already exist!");
  }

  try {
    const result = await db
      .update(playlist)
      .set({ playlistName: playlistName })
      .where(
        and(
          eq(playlist.playlistId, playlistId),
          eq(playlist.playlistOwner, ownerId)
        )
      );
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const removePlaylistService = async (
  ownerId: number,
  playlistId: number
) => {
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistId, playlistId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Playlist with this ID does not exist!");
  }

  try {
    await db
      .delete(assignedSong)
      .where(eq(assignedSong.playlistId, playlistId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  try {
    const result = await db
      .delete(playlist)
      .where(
        and(
          eq(playlist.playlistId, playlistId),
          eq(playlist.playlistOwner, ownerId)
        )
      );
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const getAssignedSongsService = async (
  ownerId: number,
  playlistId: number
) => {
  if (playlistId !== 0) {
    let playlistExist: Playlist[] = [];
    try {
      playlistExist = await db
        .select()
        .from(playlist)
        .where(
          and(
            eq(playlist.playlistOwner, ownerId),
            eq(playlist.playlistId, playlistId)
          )
        );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }

    if (playlistExist.length === 0) {
      throw new Error("Playlist with this ID does not exist!");
    }

    try {
      const result = await db
        .select({
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
        .where(
          and(
            eq(playlist.playlistOwner, ownerId),
            eq(playlist.playlistId, playlistId)
          )
        );
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  } else {
    try {
      const result: Song[] = await db.select().from(song);
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }
};

export const assignSongService = async (
  ownerId: number,
  playlistId: number,
  songId: number
) => {
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistId, playlistId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Playlist with this ID does not exist!");
  }

  let songExist: Song[] = [];
  try {
    songExist = await db.select().from(song).where(eq(song.songId, songId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (songExist.length === 0) {
    throw new Error("Song with this ID does not exist!");
  }

  let assignedSongExist: AssignedSong[] = [];
  try {
    assignedSongExist = await db
      .select()
      .from(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistId),
          eq(assignedSong.songId, songId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (assignedSongExist.length > 0) {
    throw new Error("Song is already assigned to playlist!");
  }

  try {
    const result = await db.insert(assignedSong).values({
      playlistId: playlistId,
      songId: songId,
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const assignFavoriteSongService = async (
  ownerId: number,
  songId: number
) => {
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistName, "Favorite")
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Playlist with name Favorite does not exist!");
  }

  const playlistId = playlistExist[0]?.playlistId ?? -1;

  let songExist: Song[] = [];
  try {
    songExist = await db.select().from(song).where(eq(song.songId, songId));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (songExist.length === 0) {
    throw new Error("Song with this ID does not exist!");
  }

  let assignedSongExist: AssignedSong[] = [];
  try {
    assignedSongExist = await db
      .select()
      .from(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistId),
          eq(assignedSong.songId, songId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (assignedSongExist.length > 0) {
    throw new Error("Song is already assigned to Favorite playlist!");
  }

  try {
    const result = await db.insert(assignedSong).values({
      playlistId: playlistId,
      songId: songId,
    });
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const removeSongService = async (
  ownerId: number,
  playlistId: number,
  songId: number
) => {
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistId, playlistId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Playlist with this ID does not exist!");
  }

  let assignedSongExist: AssignedSong[] = [];
  try {
    assignedSongExist = await db
      .select()
      .from(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistId),
          eq(assignedSong.songId, songId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (assignedSongExist.length === 0) {
    throw new Error("This song is not assigned to that playlist!");
  }

  try {
    const result = await db
      .delete(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistId),
          eq(assignedSong.songId, songId)
        )
      );
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};

export const removeFavoriteSongService = async (
  ownerId: number,
  songId: number
) => {
  console.log("wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
  let playlistExist: Playlist[] = [];
  try {
    playlistExist = await db
      .select()
      .from(playlist)
      .where(
        and(
          eq(playlist.playlistOwner, ownerId),
          eq(playlist.playlistName, "Favorite")
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (playlistExist.length === 0) {
    throw new Error("Pppppppppppppppppplaylist with this ID does not exist!");
  }

  let assignedSongExist: AssignedSong[] = [];
  try {
    assignedSongExist = await db
      .select()
      .from(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistExist[0]?.playlistId ?? -1),
          eq(assignedSong.songId, songId)
        )
      );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }

  if (assignedSongExist.length === 0) {
    throw new Error("This song is not assigned to that playlist!");
  }

  try {
    const result = await db
      .delete(assignedSong)
      .where(
        and(
          eq(assignedSong.playlistId, playlistExist[0]?.playlistId ?? -1),
          eq(assignedSong.songId, songId)
        )
      );
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
