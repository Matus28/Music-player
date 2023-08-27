"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processLibraryData = void 0;
const processLibraryData = (playlists, libraryData) => {
    const playlistLibrary = [];
    for (let i = 0; i < playlists.length; i++) {
        const songs = [];
        const filteredSongs = libraryData.filter((element) => element.playlistId === playlists[i]?.playlistId);
        for (let j = 0; j < filteredSongs.length; j++) {
            songs.push({
                songId: filteredSongs[j]?.songId ?? -1,
                songDriveId: filteredSongs[j]?.songDriveId ?? "",
                songFile: filteredSongs[j]?.songFile ?? "",
                songName: filteredSongs[j]?.songName ?? "",
                songArtist: filteredSongs[j]?.songArtist ?? "",
                songUrl: filteredSongs[j]?.songUrl ?? "",
                songCover: filteredSongs[j]?.songCover ?? "",
                songLength: filteredSongs[j]?.songLength ?? "",
            });
        }
        playlistLibrary.push({
            playlistId: playlists[i]?.playlistId ?? -1,
            playlistName: playlists[i]?.playlistName ?? "",
            playlistOwner: playlists[i]?.playlistOwner ?? -1,
            playlistDeletable: playlists[i]?.playlistDeletable ?? true,
            playlistSongs: songs,
        });
    }
    return { playlists: playlistLibrary };
};
exports.processLibraryData = processLibraryData;
//# sourceMappingURL=processLibraryData.js.map