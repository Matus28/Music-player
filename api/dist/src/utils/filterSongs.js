"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSongs = void 0;
const connection_1 = require("../database/connection");
const song_1 = require("../schema/song");
const filterSongs = async (songList) => {
    let result = { toAdd: [], toUpdate: [] };
    let songsFromDB = [];
    try {
        const allSongs = await connection_1.db.select().from(song_1.song);
        songsFromDB = allSongs;
    }
    catch (error) {
        console.error("Problem at reaching data from Database!");
    }
    if (songsFromDB.length === 0) {
        return { toAdd: songList, toUpdate: [] };
    }
    result = compareSongs(songsFromDB, songList);
    return result;
};
exports.filterSongs = filterSongs;
const compareSongs = (songsFromDB, songsFromDrive) => {
    const result = {
        toAdd: [],
        toUpdate: [],
    };
    for (const songFromDrive of songsFromDrive) {
        const matchingSong = songsFromDB.find((songFromDB) => {
            if (songFromDrive.name === songFromDB.songFile) {
                if (songFromDrive.id !== songFromDB.songDriveId ||
                    songFromDrive.url !== songFromDB.songUrl ||
                    songFromDrive.cover !== songFromDB.songCover) {
                    result.toUpdate.push(songFromDrive);
                }
                return songFromDB;
            }
        });
        if (matchingSong) {
            continue;
        }
        result.toAdd.push(songFromDrive);
    }
    return result;
};
//# sourceMappingURL=filterSongs.js.map