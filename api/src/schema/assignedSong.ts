import { InferModel, relations } from "drizzle-orm";
import { mysqlTable, int, primaryKey } from "drizzle-orm/mysql-core";
import { playlist } from "./playlist";
import { song } from "./song";

export const assignedSong = mysqlTable(
  "assignedSong",
  {
    playlistId: int("playlist_id")
      .notNull()
      .references(() => playlist.playlistId),
    songId: int("song_id")
      .notNull()
      .references(() => song.songId),
  },
  (t) => ({
    pk: primaryKey(t.playlistId, t.songId),
  })
);

export const assignedSongRelations = relations(assignedSong, ({ one }) => ({
  playlist: one(playlist, {
    fields: [assignedSong.playlistId],
    references: [playlist.playlistId],
  }),
  song: one(song, { fields: [assignedSong.songId], references: [song.songId] }),
}));

export type AssignedSong = InferModel<typeof assignedSong>;
