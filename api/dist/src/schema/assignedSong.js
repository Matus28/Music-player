"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignedSongRelations = exports.assignedSong = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const playlist_1 = require("./playlist");
const song_1 = require("./song");
exports.assignedSong = (0, mysql_core_1.mysqlTable)("assignedSong", {
    playlistId: (0, mysql_core_1.int)("playlist_id")
        .notNull()
        .references(() => playlist_1.playlist.playlistId),
    songId: (0, mysql_core_1.int)("song_id")
        .notNull()
        .references(() => song_1.song.songId),
}, (t) => ({
    pk: (0, mysql_core_1.primaryKey)(t.playlistId, t.songId),
}));
exports.assignedSongRelations = (0, drizzle_orm_1.relations)(exports.assignedSong, ({ one }) => ({
    playlist: one(playlist_1.playlist, {
        fields: [exports.assignedSong.playlistId],
        references: [playlist_1.playlist.playlistId],
    }),
    song: one(song_1.song, { fields: [exports.assignedSong.songId], references: [song_1.song.songId] }),
}));
//# sourceMappingURL=assignedSong.js.map