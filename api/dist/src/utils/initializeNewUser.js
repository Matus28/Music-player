"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeNewUser = void 0;
const connection_1 = require("../database/connection");
const drizzle_orm_1 = require("drizzle-orm");
const playlist_1 = require("../schema/playlist");
const user_service_1 = require("../services/user.service");
const initializeNewUser = async (username) => {
    const newUser = await (0, user_service_1.findUser)(username, "username");
    if (!newUser) {
        throw new Error(`Failed to find user with this username! ${username}`);
    }
    const userId = newUser.userId;
    let exist = [];
    try {
        exist = await connection_1.db
            .select()
            .from(playlist_1.playlist)
            .where((0, drizzle_orm_1.eq)(playlist_1.playlist.playlistOwner, userId));
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Failed to retrieve user playlist information from the database.");
    }
    if (exist.length > 0) {
        throw new Error("Failed to create playlist, playlist already exist.");
    }
    try {
        const result = await connection_1.db.insert(playlist_1.playlist).values([
            {
                playlistName: "All Tracks",
                playlistOwner: userId,
                playlistDeletable: false,
            },
            {
                playlistName: "Favorite",
                playlistOwner: userId,
                playlistDeletable: false,
            },
        ]);
        return result;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        throw new Error("Failed to create playlist!");
    }
};
exports.initializeNewUser = initializeNewUser;
//# sourceMappingURL=initializeNewUser.js.map