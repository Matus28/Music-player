import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Song } from "../utils/types";
import { UserState } from "../context/AuthContext";
import axios from "axios";

interface AssignedSongData {
  playlistId: number;
  userValue: UserState;
}

export const useGetAssignedSong = (
  value: AssignedSongData
): UseQueryResult<Song[]> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["assignedSongs", value.userValue],
    queryFn: async (): Promise<Song[] | unknown> => {
      try {
        const result = await axios.get<Song[]>(
          `${import.meta.env.VITE_API_URL}/api/playlists/${
            value.playlistId
          }/songs`,
          {
            headers: {
              Authorization: `Bearer ${value.userValue.user?.token}`,
            },
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return result.data;
      } catch (error: unknown) {
        console.log(error);
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.message);
        }
        if (error instanceof Error) {
          throw new Error("Something went wrong");
        }
      }
    },
    enabled: !!value.userValue,
  });
};
