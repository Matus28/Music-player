"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistRelations = exports.playlist = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const mysql_core_1 = require("drizzle-orm/mysql-core");
const user_1 = require("./user");
const assignedSong_1 = require("./assignedSong");
exports.playlist = (0, mysql_core_1.mysqlTable)("playlist", {
    playlistId: (0, mysql_core_1.int)("playlist_id").autoincrement().primaryKey(),
    playlistName: (0, mysql_core_1.text)("playlist_name"),
    playlistOwner: (0, mysql_core_1.int)("playlist_owner"),
    playlistDeletable: (0, mysql_core_1.boolean)("playlist_is_deletable"),
});
exports.playlistRelations = (0, drizzle_orm_1.relations)(exports.playlist, ({ one, many }) => ({
    owner: one(user_1.user, {
        fields: [exports.playlist.playlistOwner],
        references: [user_1.user.userId],
    }),
    assignedSong: many(assignedSong_1.assignedSong),
}));
//# sourceMappingURL=playlist.js.map