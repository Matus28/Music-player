import { NewSong } from "../schema/song";
import { addSongs } from "./addSongs";
import { filterSongs } from "./filterSongs";
import { getSongsDataTask } from "./getSongsDataTask";
import { getSongsMetadata } from "./getSongsMetadata";

export const updateDatabase = async (): Promise<boolean> => {
  let taskSuccessful = true;
  let songsToAdd: SongDriveData[] = [];
  let songsWithMeta: NewSong[] = [];

  try {
    const songsDrive = await getSongsDataTask();
    if (!songsDrive) {
      taskSuccessful = false;
    } else {
      songsToAdd = songsDrive;
    }
  } catch (error) {
    taskSuccessful = false;
    console.log(error);
  }

  try {
    const filteredSongs = await filterSongs(songsToAdd);
    if (filteredSongs.length === 0) {
      return taskSuccessful;
    } else {
      songsToAdd = filteredSongs;
    }
  } catch (error) {
    taskSuccessful = false;
    console.log(error);
  }

  try {
    const songsWithMetadata = await getSongsMetadata(songsToAdd);
    if (!songsWithMetadata) {
      taskSuccessful = false;
    } else {
      songsWithMeta = songsWithMetadata;
    }
  } catch (error) {
    taskSuccessful = false;
    console.log(error);
  }

  try {
    const result = await addSongs(songsWithMeta);
  } catch (error) {
    taskSuccessful = false;
    console.log(error);
  }

  return taskSuccessful;
};
