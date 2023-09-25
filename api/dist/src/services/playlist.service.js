"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteSongService = exports.removeSongService = exports.assignFavoriteSongService = exports.assignSongService = exports.getAssignedSongsService = exports.removePlaylistService = exports.updatePlaylistService = exports.createPlaylistService = exports.getAllPlaylistsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const connection_1 = require("../database/connection");
const playlist_1 = require("../schema/playlist");
const song_1 = require("../schema/song");
const assignedSong_1 = require("../schema/assignedSong");
const getAllPlaylistsService = async (ownerId) => {
    try {
        const result = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId));
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.getAllPlaylistsService = getAllPlaylistsService;
const createPlaylistService = async (ownerId, playlistName) => {
    let exist = [];
    try {
        exist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistName, playlistName)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (exist.length > 0) {
        throw new Error("Playlist with this name already exist!");
    }
    try {
        const result = await connection_1.db.insert(playlist_1.playlist).values({
            playlistName: playlistName,
            playlistOwner: ownerId,
            playlistDeletable: true,
        });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.createPlaylistService = createPlaylistService;
const updatePlaylistService = async (ownerId, playlistId, playlistName) => {
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Playlist with this ID does not exist!");
    }
    let duplicateExist = [];
    try {
        duplicateExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistName, playlistName)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (duplicateExist.length > 0) {
        throw new Error("Playlist with this name already exist!");
    }
    try {
        const result = await connection_1.db
            .update(playlist_1.playlist)
            .set({ playlistName: playlistName })
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId)));
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.updatePlaylistService = updatePlaylistService;
const removePlaylistService = async (ownerId, playlistId) => {
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Playlist with this ID does not exist!");
    }
    try {
        await connection_1.db
            .delete(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    try {
        const result = await connection_1.db
            .delete(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId)));
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.removePlaylistService = removePlaylistService;
const getAssignedSongsService = async (ownerId, playlistId) => {
    if (playlistId !== 0) {
        let playlistExist = [];
        try {
            playlistExist = await connection_1.db
                .select()
                .from(playlist_1.playlist)
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        if (playlistExist.length === 0) {
            throw new Error("Playlist with this ID does not exist!");
        }
        try {
            const result = await connection_1.db
                .select({
                songId: assignedSong_1.assignedSong.songId,
                songDriveId: song_1.song.songDriveId,
                songName: song_1.song.songName,
                songArtist: song_1.song.songArtist,
                songUrl: song_1.song.songUrl,
                songCover: song_1.song.songCover,
                songLength: song_1.song.songLength,
            })
                .from(assignedSong_1.assignedSong)
                .leftJoin(playlist_1.playlist, (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlist_1.playlist.playlistId))
                .leftJoin(song_1.song, (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, song_1.song.songId))
                .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    else {
        try {
            const result = await connection_1.db.select().from(song_1.song);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
};
exports.getAssignedSongsService = getAssignedSongsService;
const assignSongService = async (ownerId, playlistId, songId) => {
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Playlist with this ID does not exist!");
    }
    let songExist = [];
    try {
        songExist = await connection_1.db.select().from(song_1.song).where((0, drizzle_orm_1.eq)(song_1.song.songId, songId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (songExist.length === 0) {
        throw new Error("Song with this ID does not exist!");
    }
    let assignedSongExist = [];
    try {
        assignedSongExist = await connection_1.db
            .select()
            .from(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistId), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (assignedSongExist.length > 0) {
        throw new Error("Song is already assigned to playlist!");
    }
    try {
        const result = await connection_1.db.insert(assignedSong_1.assignedSong).values({
            playlistId: playlistId,
            songId: songId,
        });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.assignSongService = assignSongService;
const assignFavoriteSongService = async (ownerId, songId) => {
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistName, "Favorite")));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Playlist with name Favorite does not exist!");
    }
    const playlistId = playlistExist[0]?.playlistId ?? -1;
    let songExist = [];
    try {
        songExist = await connection_1.db.select().from(song_1.song).where((0, drizzle_orm_1.eq)(song_1.song.songId, songId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (songExist.length === 0) {
        throw new Error("Song with this ID does not exist!");
    }
    let assignedSongExist = [];
    try {
        assignedSongExist = await connection_1.db
            .select()
            .from(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistId), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (assignedSongExist.length > 0) {
        throw new Error("Song is already assigned to Favorite playlist!");
    }
    try {
        const result = await connection_1.db.insert(assignedSong_1.assignedSong).values({
            playlistId: playlistId,
            songId: songId,
        });
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.assignFavoriteSongService = assignFavoriteSongService;
const removeSongService = async (ownerId, playlistId, songId) => {
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistId, playlistId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Playlist with this ID does not exist!");
    }
    let assignedSongExist = [];
    try {
        assignedSongExist = await connection_1.db
            .select()
            .from(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistId), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (assignedSongExist.length === 0) {
        throw new Error("This song is not assigned to that playlist!");
    }
    try {
        const result = await connection_1.db
            .delete(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistId), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.removeSongService = removeSongService;
const removeFavoriteSongService = async (ownerId, songId) => {
    console.log("wiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    let playlistExist = [];
    try {
        playlistExist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, ownerId), (0, drizzle_orm_1.eq)(playlist_1.playlist.playlistName, "Favorite")));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (playlistExist.length === 0) {
        throw new Error("Pppppppppppppppppplaylist with this ID does not exist!");
    }
    let assignedSongExist = [];
    try {
        assignedSongExist = await connection_1.db
            .select()
            .from(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistExist[0]?.playlistId ?? -1), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
    if (assignedSongExist.length === 0) {
        throw new Error("This song is not assigned to that playlist!");
    }
    try {
        const result = await connection_1.db
            .delete(assignedSong_1.assignedSong)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.playlistId, playlistExist[0]?.playlistId ?? -1), (0, drizzle_orm_1.eq)(assignedSong_1.assignedSong.songId, songId)));
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};
exports.removeFavoriteSongService = removeFavoriteSongService;
//# sourceMappingURL=playlist.service.js.map