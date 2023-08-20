import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Library } from "../utils/types";
import { UserState } from "../context/AuthContext";
import axios from "axios";

export const useLibrary = (userValue: UserState): UseQueryResult<Library> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["library", userValue],
    queryFn: async (): Promise<Library | unknown> => {
      try {
        const result = await axios.get<Library[]>(
          `${import.meta.env.VITE_API_URL}/api/library`,
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
