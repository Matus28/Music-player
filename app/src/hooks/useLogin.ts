import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { UserActionType } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";
import { useSnackBar } from "../context/SnackbarContext";

export interface FetchUser {
  email: string;
  token: string;
  error?: Error;
}

export interface FetchData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { showSnackBar } = useSnackBar();
  const { dispatch } = useAuthContext();
  return useMutation({
    mutationFn: async (value: FetchData) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/login`,
          value,
          {
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return data as FetchUser;
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
      showSnackBar("Login failed!", "error");
    },
    onSuccess: (data) => {
      showSnackBar("You are now logged in.", "info");
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: UserActionType.LOGIN, payload: data });
      }
    },
  });
};
