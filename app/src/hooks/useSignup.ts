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
  username: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const { showSnackBar } = useSnackBar();
  const { dispatch } = useAuthContext();
  return useMutation({
    mutationFn: async (value: FetchData) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/users/signup`,
          value,
          {
            validateStatus(status) {
              return status === 201;
            },
          }
        );
        return data as FetchUser;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.log(error.response?.data);
          console.log("wiiiiiiiiiiiiiiiiiiiiii");
          throw new Error(error.response?.data.message);
        }
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
    onError: (error: Error) => {
      console.log(error);
      showSnackBar("Account could not be created!", "error");
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: UserActionType.LOGIN, payload: data });
        showSnackBar("Account created.", "info");
      }
    },
  });
};
