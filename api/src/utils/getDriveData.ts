import { GoogleAuth } from "google-auth-library";
import { drive_v3, google } from "googleapis";
import * as dotenv from "dotenv";

dotenv.config();

type fetchedData = {
  id: string;
  name: string;
  parents: string[];
  description: string;
};

export const getDriveData = async () => {
  const auth = new GoogleAuth({
    keyFile: process.env.CREDENTIAL_PATH,
    scopes: ["https://www.googleapis.com/auth/drive"],
  });

  const service = google.drive({ version: "v3", auth });

  const files: fetchedData[] = [];
  const output: SongDriveData[] = [];
  let fileList: drive_v3.Schema$File[];

  try {
    const res = await service.files.list({
      q: "mimeType='audio/mpeg'",
      fields: "nextPageToken, files(id, name, parents, description)",
      spaces: "drive",
    });

    fileList = res.data.files!;

    Array.prototype.push.apply(files, fileList);
  } catch (err) {
    throw new Error();
  }

  try {
    if (files) {
      for (const file of files) {
        if (file.parents) {
          const parentFolders = await getParentFoldersName(
            service,
            file.parents[0] ?? ""
          );

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
  } catch (err) {
    throw new Error();
  }
};

const getParentFoldersName = async (
  service: drive_v3.Drive,
  folderId: string
): Promise<Array<string | null | undefined>> => {
  const parentFolderNames = [];

  try {
    const parentFolder = await service.files.get({
      fileId: folderId,
      fields: "id, name, parents",
    });

    parentFolderNames.push(parentFolder.data.name);

    if (parentFolder.data.parents) {
      const grandParentFolderNames = await getParentFoldersName(
        service,
        parentFolder.data.parents[0] ?? ""
      );
      if (grandParentFolderNames[0]?.toLowerCase() !== "music-player")
        parentFolderNames.push(...grandParentFolderNames);
    }

    return parentFolderNames;
  } catch (err) {
    throw new Error();
  }
};
