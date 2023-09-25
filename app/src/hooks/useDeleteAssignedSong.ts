import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserState } from "../context/AuthContext";
import axios from "axios";

interface AssignedSongData {
  playlistId?: number;
  playlistName?: string;
  songId: number;
  userValue: UserState;
}

export const useDeleteAssignedSong = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: AssignedSongData) => {
      try {
        if (value.playlistId && !value.playlistName) {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/playlists/${
              value.playlistId
            }/songs`,
            {
              headers: {
                Authorization: `Bearer ${value.userValue.user?.token}`,
              },
              data: { songId: value.songId },
              validateStatus(status) {
                return status >= 200 && status < 300;
              },
            }
          );
          return data;
        } else if (!value.playlistId && value.playlistName) {
          const { data } = await axios.delete(
            `${import.meta.env.VITE_API_URL}/api/playlists/favorite`,
            {
              headers: {
                Authorization: `Bearer ${value.userValue.user?.token}`,
              },
              data: { songId: value.songId },
              validateStatus(status) {
                return status >= 200 && status < 300;
              },
            }
          );
          return data;
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
      queryClient.invalidateQueries(["playlists"]);
      queryClient.invalidateQueries(["library"]);
    },
  });
};
