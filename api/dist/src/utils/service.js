"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDatabase = void 0;
const addSongs_1 = require("./addSongs");
const filterSongs_1 = require("./filterSongs");
const getSongsDataTask_1 = require("./getSongsDataTask");
const getSongsMetadata_1 = require("./getSongsMetadata");
const updateSongs_1 = require("./updateSongs");
const updateDatabase = async () => {
    let taskSuccessful = true;
    let songsToAdd = [];
    let songsToUpdate = [];
    let songsWithMeta = [];
    try {
        const songsDrive = await (0, getSongsDataTask_1.getSongsDataTask)();
        if (!songsDrive) {
            taskSuccessful = false;
        }
        else {
            songsToAdd = songsDrive;
        }
    }
    catch (error) {
        taskSuccessful = false;
        console.log(error);
    }
    try {
        const filteredSongs = await (0, filterSongs_1.filterSongs)(songsToAdd);
        if (filteredSongs.toAdd.length === 0 &&
            filteredSongs.toUpdate.length === 0) {
            return taskSuccessful;
        }
        else {
            songsToAdd = filteredSongs.toAdd;
            songsToUpdate = filteredSongs.toUpdate;
        }
    }
    catch (error) {
        taskSuccessful = false;
        console.log(error);
    }
    try {
        const songsWithMetadata = await (0, getSongsMetadata_1.getSongsMetadata)(songsToAdd);
        if (!songsWithMetadata) {
            taskSuccessful = false;
        }
        else {
            songsWithMeta = songsWithMetadata;
        }
    }
    catch (error) {
        taskSuccessful = false;
        console.log(error);
    }
    try {
        songsToUpdate.map(async (songToUpdate) => {
            await (0, updateSongs_1.updateSong)(songToUpdate);
        });
    }
    catch (error) {
        taskSuccessful = false;
        console.log(error);
    }
    try {
        await (0, addSongs_1.addSongs)(songsWithMeta);
    }
    catch (error) {
        taskSuccessful = false;
        console.log(error);
    }
    return taskSuccessful;
};
exports.updateDatabase = updateDatabase;
//# sourceMappingURL=service.js.map