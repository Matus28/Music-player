"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songRelations = exports.song = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const assignedSong_1 = require("./assignedSong");
exports.song = (0, mysql_core_1.mysqlTable)("song", {
    songId: (0, mysql_core_1.int)("song_id").autoincrement().primaryKey(),
    songDriveId: (0, mysql_core_1.text)("song_drive_id"),
    songFile: (0, mysql_core_1.text)("song_file"),
    songName: (0, mysql_core_1.text)("song_name"),
    songArtist: (0, mysql_core_1.text)("song_artist"),
    songUrl: (0, mysql_core_1.text)("song_url"),
    songCover: (0, mysql_core_1.text)("song_cover"),
    songLength: (0, mysql_core_1.text)("song_length"),
});
exports.songRelations = (0, drizzle_orm_1.relations)(exports.song, ({ many }) => ({
    assignedSong: many(assignedSong_1.assignedSong),
}));
//# sourceMappingURL=song.js.map