import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Playlist } from "../utils/types";
import { UserState } from "../context/AuthContext";
import axios from "axios";

export const usePlaylist = (
  userValue: UserState
): UseQueryResult<Playlist[]> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["playlists", userValue],
    queryFn: async (): Promise<Playlist[] | unknown> => {
      try {
        const result = await axios.get<Playlist[]>(
          `${import.meta.env.VITE_API_URL}/api/playlists`,
          {
            headers: {
              Authorization: `Bearer ${userValue.user?.token}`,
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
    enabled: !!userValue,
  });
};
