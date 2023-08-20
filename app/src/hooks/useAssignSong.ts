import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";

interface AssignSongData {
  playlistId?: number;
  playlistName?: string;
  songId: number;
  userValue: UserState;
}

export const useAssignSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: AssignSongData) => {
      try {
        if (value.playlistId && !value.playlistName) {
          const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/playlists/${
              value.playlistId
            }/songs`,
            { songId: value.songId },
            {
              headers: {
                Authorization: `Bearer ${value.userValue.user?.token}`,
              },
              validateStatus(status) {
                return status >= 200 && status < 300;
              },
            }
          );
          return result;
        } else if (!value.playlistId && value.playlistName === "Favorite") {
          const result = await axios.post(
            `${import.meta.env.VITE_API_URL}/api/playlists/favorite`,
            { songId: value.songId },
            {
              headers: {
                Authorization: `Bearer ${value.userValue.user?.token}`,
              },
              validateStatus(status) {
                return status >= 200 && status < 300;
              },
            }
          );
          return result;
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.error);
        }
        if (error instanceof Error) {
          throw new Error("Something went wrong");
        }
      }
    },
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["songs"]);
      queryClient.invalidateQueries(["library"]);
    },
  });
};
