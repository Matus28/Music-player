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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDriveData = void 0;
const google_auth_library_1 = require("google-auth-library");
const googleapis_1 = require("googleapis");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const getDriveData = async () => {
    const auth = new google_auth_library_1.GoogleAuth({
        credentials: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY,
        },
        scopes: ["https://www.googleapis.com/auth/drive"],
    });
    const service = googleapis_1.google.drive({ version: "v3", auth });
    const files = [];
    const output = [];
    let fileList;
    try {
        const res = await service.files.list({
            q: "mimeType='audio/mpeg'",
            fields: "nextPageToken, files(id, name, parents, description)",
            spaces: "drive",
        });
        fileList = res.data.files;
        Array.prototype.push.apply(files, fileList);
    }
    catch (err) {
        throw new Error();
    }
    try {
        if (files) {
            for (const file of files) {
                if (file.parents) {
                    const parentFolders = await getParentFoldersName(service, file.parents[0] ?? "");
                    console.log(`******************************`);
                    console.log(file.name);
                    console.log(`******************************`);
                    output.push({
                        id: file.id,
                        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
                        download: `https://docs.google.com/uc?export=download&id=${file.id}`,
                        name: file.name,
                        folders: parentFolders,
                        cover: file.description,
                    });
                }
            }
        }
        return output;
    }
    catch (err) {
        throw new Error();
    }
};
exports.getDriveData = getDriveData;
const getParentFoldersName = async (service, folderId) => {
    const parentFolderNames = [];
    try {
        const parentFolder = await service.files.get({
            fileId: folderId,
            fields: "id, name, parents",
        });
        parentFolderNames.push(parentFolder.data.name);
        if (parentFolder.data.parents) {
            const grandParentFolderNames = await getParentFoldersName(service, parentFolder.data.parents[0] ?? "");
            if (grandParentFolderNames[0]?.toLowerCase() !== "music-player")
                parentFolderNames.push(...grandParentFolderNames);
        }
        return parentFolderNames;
    }
    catch (err) {
        throw new Error();
    }
};
//# sourceMappingURL=getDriveData.js.map