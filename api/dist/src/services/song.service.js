"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllSongsService = void 0;
const connection_1 = require("../database/connection");
const song_1 = require("../schema/song");
const getAllSongsService = async () => {
    try {
        const result = await connection_1.db.select().from(song_1.song);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.getAllSongsService = getAllSongsService;
//# sourceMappingURL=song.service.js.map