import * as fs from "fs";
import axios, { AxiosResponse } from "axios";
import { IAudioMetadata, parseFile } from "music-metadata";
import { NewSong } from "../schema/song";

export const getSongsMetadata = async (
  songList: SongDriveData[]
): Promise<NewSong[]> => {
  const result: NewSong[] = [];
  for (let i: number = 0; i < songList.length; i++) {
    const fileName = await downloadSong(songList[i], i);
    const metadata = await extractData(fileName ?? "");
    let minutes: number = 0;
    let seconds: number = 0;

    if (metadata?.format.duration) {
      minutes = Math.floor(metadata?.format.duration / 60);
      seconds = Math.ceil(
        metadata?.format.duration -
          Math.floor(metadata?.format.duration / 60) * 60
      );
    }

    if (metadata?.format.duration) {
      const songDuration = `${minutes < 10 ? `0${minutes}` : minutes}:${
        seconds < 10 ? `0${seconds}` : seconds
      }`;

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

const downloadSong = async (
  song: SongDriveData | undefined,
  index: number
): Promise<string | undefined> => {
  const fileName = `song${index}.mp3`;
  const filePath = `src/utils/download/${fileName}`;
  let file: AxiosResponse;

  try {
    const response = await axios.get(song?.download ?? "", {
      responseType: "arraybuffer",
    });
    file = response;
    await fs.promises.writeFile(filePath, response.data);
  } catch (error) {
    console.log(`Error at requesting of ${fileName} file!`);
    console.error(error);
    return;
  }

  try {
    await fs.promises.writeFile(filePath, file.data);
    console.log(`Download of ${fileName} file successful.`);
  } catch (error) {
    console.log(`Download of ${fileName} file failed!`);
    console.error(error);
    return;
  }

  return fileName;
};

const removeSong = async (fileName: string): Promise<void> => {
  const filePath = `src/utils/download/${fileName}`;

  try {
    fs.unlinkSync(filePath);
    console.log(`Remove of ${fileName} file successful.`);
  } catch (error) {
    console.log(`Error at removing of ${fileName} file!`);
    console.error(error);
    return;
  }
};

const extractData = async (
  fileName: string
): Promise<IAudioMetadata | undefined> => {
  const filePath = `src/utils/download/${fileName}`;

  try {
    const metadata = await parseFile(filePath);
    // console.log(inspect(metadata, { showHidden: false, depth: null }));
    return metadata;
  } catch (error) {
    console.log(`Parsing of ${fileName} file failed!`);
    console.error(error);
  }
};
