"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playlistController = void 0;
const playlist_service_1 = require("../services/playlist.service");
exports.playlistController = {
    async getPlaylists(req, res) {
        const userId = req.user?.userId ?? -1;
        try {
            const result = await (0, playlist_service_1.getAllPlaylistsService)(userId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            }
        }
    },
    async createPlaylist(req, res) {
        const userId = req.user?.userId ?? -1;
        const { playlistName } = req.body;
        try {
            const result = await (0, playlist_service_1.createPlaylistService)(userId, playlistName);
            if (result && result[0].affectedRows === 1) {
                res.status(200).json({ message: "Playlist successfully created!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
    async updatePlaylist(req, res) {
        const playlistId = req.params.id;
        const userId = req.user?.userId ?? -1;
        const { playlistName } = req.body;
        try {
            const result = await (0, playlist_service_1.updatePlaylistService)(userId, parseInt(playlistId ?? ""), playlistName);
            if (result && result[0].affectedRows === 1) {
                res.status(200).json({ message: "Playlist successfully updated!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
    async removePlaylist(req, res) {
        const playlistId = req.params.id;
        const userId = req.user?.userId ?? -1;
        try {
            const result = await (0, playlist_service_1.removePlaylistService)(userId, parseInt(playlistId ?? ""));
            if (result && result[0].affectedRows === 1) {
                res.status(200).json({ message: "Playlist was successfully removed!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
    async getAssignedSongs(req, res) {
        const userId = req.user?.userId ?? -1;
        const playlistId = parseInt(req.params.id ?? "-1");
        try {
            const result = await (0, playlist_service_1.getAssignedSongsService)(userId, playlistId);
            res.status(200).json(result);
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(404).json({ message: error.message });
            }
        }
    },
    async assignFavoriteSong(req, res) {
        const userId = req.user?.userId ?? -1;
        const { songId } = req.body;
        try {
            const result = await (0, playlist_service_1.assignFavoriteSongService)(userId, songId);
            if (result && result[0].affectedRows === 1) {
                res
                    .status(201)
                    .json({ message: "Song successfully assign to playlist!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
    async assignSong(req, res) {
        const playlistId = req.params.id;
        const userId = req.user?.userId ?? -1;
        const { songId } = req.body;
        try {
            const result = await (0, playlist_service_1.assignSongService)(userId, parseInt(playlistId ?? ""), songId);
            if (result && result[0].affectedRows === 1) {
                res
                    .status(201)
                    .json({ message: "Song successfully assign to playlist!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
    async removeSong(req, res) {
        const playlistId = req.params.id;
        const userId = req.user?.userId ?? -1;
        const { songId } = req.body;
        try {
            const result = await (0, playlist_service_1.removeSongService)(userId, parseInt(playlistId ?? ""), songId);
            if (result && result[0].affectedRows === 1) {
                res
                    .status(200)
                    .json({ message: "Song successfully remove from playlist!" });
            }
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            }
        }
    },
};
//# sourceMappingURL=playlist.controller.js.map