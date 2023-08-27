"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSong = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const song_1 = require("../schema/song");
const updateSong = async (songToUpdate) => {
    try {
        const result = await connection_1.db
            .update(song_1.song)
            .set({
            songDriveId: songToUpdate.id,
            songUrl: songToUpdate.url,
            songCover: songToUpdate.cover,
        })
            .where((0, drizzle_orm_1.eq)(song_1.song.songFile, songToUpdate.name));
    }
    catch (error) {
        console.log(`Data not updated in the Database!`);
        console.error(error);
        return;
    }
};
exports.updateSong = updateSong;
//# sourceMappingURL=updateSongs.js.map