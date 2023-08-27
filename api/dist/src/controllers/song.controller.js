"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songController = void 0;
const song_service_1 = require("../services/song.service");
exports.songController = {
    async getSongs(req, res) {
        try {
            const result = await (0, song_service_1.getAllSongsService)();
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            }
        }
    },
};
//# sourceMappingURL=song.controller.js.map