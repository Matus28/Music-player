"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSongs = void 0;
const connection_1 = require("../database/connection");
const song_1 = require("../schema/song");
const addSongs = async (songList) => {
    try {
        const result = await connection_1.db.insert(song_1.song).values(songList);
    }
    catch (error) {
        console.log(`Data not added to the Database!`);
        console.error(error);
        return;
    }
};
exports.addSongs = addSongs;
//# sourceMappingURL=addSongs.js.map