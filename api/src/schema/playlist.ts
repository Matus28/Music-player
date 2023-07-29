import { InferModel, relations } from "drizzle-orm";
import { mysqlTable, int, text, boolean } from "drizzle-orm/mysql-core";
import { user } from "./user";
import { assignedSong } from "./assignedSong";

export const playlist = mysqlTable("playlist", {
  playlistId: int("playlist_id").autoincrement().primaryKey(),
  playlistName: text("playlist_name"),
  playlistOwner: int("playlist_owner"),
  playlistDeletable: boolean("playlist_is_deletable"),
});

export const playlistRelations = relations(playlist, ({ one, many }) => ({
  owner: one(user, {
    fields: [playlist.playlistOwner],
    references: [user.userId],
  }),
  assignedSong: many(assignedSong),
}));

export type Playlist = InferModel<typeof playlist>;
export type NewPlaylist = InferModel<typeof playlist, "insert">;
