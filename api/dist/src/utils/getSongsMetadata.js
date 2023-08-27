"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSongsMetadata = void 0;
const fs = __importStar(require("fs"));
const axios_1 = __importDefault(require("axios"));
const music_metadata_1 = require("music-metadata");
const getSongsMetadata = async (songList) => {
    const result = [];
    for (let i = 0; i < songList.length; i++) {
        const fileName = await downloadSong(songList[i], i);
        const metadata = await extractData(fileName ?? "");
        let minutes = 0;
        let seconds = 0;
        if (metadata?.format.duration) {
            minutes = Math.floor(metadata?.format.duration / 60);
            seconds = Math.ceil(metadata?.format.duration -
                Math.floor(metadata?.format.duration / 60) * 60);
        }
        if (metadata?.format.duration) {
            const songDuration = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
            result.push({
                songDriveId: songList[i]?.id ?? "",
                songFile: songList[i]?.name,
                songName: metadata.common.title ?? "",
                songArtist: metadata.common.artist ?? "",
                songUrl: songList[i]?.url ?? "",
                songCover: songList[i]?.cover ?? "",
                songLength: songDuration,
            });
        }
        await removeSong(fileName ?? "");
    }
    return result;
};
exports.getSongsMetadata = getSongsMetadata;
const downloadSong = async (song, index) => {
    const fileName = `song${index}.mp3`;
    const filePath = `src/utils/download/${fileName}`;
    let file;
    try {
        const response = await axios_1.default.get(song?.download ?? "", {
            responseType: "arraybuffer",
        });
        file = response;
        await fs.promises.writeFile(filePath, response.data);
    }
    catch (error) {
        console.log(`Error at requesting of ${fileName} file!`);
        console.error(error);
        return;
    }
    try {
        await fs.promises.writeFile(filePath, file.data);
        console.log(`Download of ${fileName} file successful.`);
    }
    catch (error) {
        console.log(`Download of ${fileName} file failed!`);
        console.error(error);
        return;
    }
    return fileName;
};
const removeSong = async (fileName) => {
    const filePath = `src/utils/download/${fileName}`;
    try {
        fs.unlinkSync(filePath);
        console.log(`Remove of ${fileName} file successful.`);
    }
    catch (error) {
        console.log(`Error at removing of ${fileName} file!`);
        console.error(error);
        return;
    }
};
const extractData = async (fileName) => {
    const filePath = `src/utils/download/${fileName}`;
    try {
        const metadata = await (0, music_metadata_1.parseFile)(filePath);
        // console.log(inspect(metadata, { showHidden: false, depth: null }));
        return metadata;
    }
    catch (error) {
        console.log(`Parsing of ${fileName} file failed!`);
        console.error(error);
    }
};
//# sourceMappingURL=getSongsMetadata.js.map