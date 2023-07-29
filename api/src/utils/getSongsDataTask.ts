import { getDriveData } from "./getDriveData";

export const getSongsDataTask = async (): Promise<
  SongDriveData[] | undefined
> => {
  try {
    const songesData = await getDriveData();
    return songesData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return [];
    }
  }
};
