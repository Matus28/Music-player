"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLibraryService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const playlist_1 = require("../schema/playlist");
const assignedSong_1 = require("../schema/assignedSong");
const song_1 = require("../schema/song");
const processLibraryData_1 = require("../utils/processLibraryData");
const getLibraryService = async (ownerId) => {
    let allPlaylists = [];
    try {
        allPlaylists = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    let library = [];
    try {
        library = await connection_1.db
            .select({
            playlistId: playlist_1.playlist.playlistId,
            playlistName: playlist_1.playlist.playlistName,
            playlistOwner: playlist_1.playlist.playlistOwner,
            playlistDeletable: playlist_1.playlist.playlistDeletable,
            songId: assignedSong_1.assignedSong.songId,
            songDriveId: song_1.song.songDriveId,
            songFile: song_1.song.songFile,
            songName: song_1.song.songName,
            songArtist: song_1.song.songArtist,
            songUrl: song_1.song.songUrl,
            songCover: song_1.song.songCover,
            songLength: song_1.song.songLength,
        })
            .from(assignedSong_1.assignedSong)
            .leftJoin(playlist_1.playlist, (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlist_1.playlist.playlistId))
            .leftJoin(song_1.song, (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, song_1.song.songId))
            .where((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    const result = (0, processLibraryData_1.processLibraryData)(allPlaylists, library);
    return result;
};
exports.getLibraryService = getLibraryService;
//# sourceMappingURL=library.service.js.map