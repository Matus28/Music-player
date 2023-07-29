import { InferModel, relations } from "drizzle-orm";
import { mysqlTable, int, text } from "drizzle-orm/mysql-core";
import { assignedSong } from "./assignedSong";

export const song = mysqlTable("song", {
  songId: int("song_id").autoincrement().primaryKey(),
  songDriveId: text("song_drive_id"),
  songName: text("song_name"),
  songArtist: text("song_artist"),
  songUrl: text("song_url"),
  songCover: text("song_cover"),
  songLength: text("song_length"),
});

export const songRelations = relations(song, ({ many }) => ({
  assignedSong: many(assignedSong),
}));

export type Song = InferModel<typeof song>;
export type NewSong = InferModel<typeof song, "insert">;
