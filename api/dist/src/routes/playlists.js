"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const requireAuth_1 = require("../middlewares/requireAuth");
const playlist_controller_1 = require("../controllers/playlist.controller");
exports.router = express_1.default.Router();
exports.router.use(requireAuth_1.requireAuth);
exports.router.get("/", playlist_controller_1.playlistController.getPlaylists);
exports.router.post("/", playlist_controller_1.playlistController.createPlaylist);
exports.router.put("/:id", playlist_controller_1.playlistController.updatePlaylist);
exports.router.delete("/:id", playlist_controller_1.playlistController.removePlaylist);
exports.router.post("/favorite", playlist_controller_1.playlistController.assignFavoriteSong);
exports.router.get("/:id/songs", playlist_controller_1.playlistController.getAssignedSongs);
exports.router.post("/:id/songs", playlist_controller_1.playlistController.assignSong);
exports.router.delete("/:id/songs", playlist_controller_1.playlistController.removeSong);
//# sourceMappingURL=playlists.js.map