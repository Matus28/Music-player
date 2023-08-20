import * as React from "react";
import { User } from "../utils/types";

export enum UserActionType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface UserState {
  user: User | null;
}

export interface UserAction {
  type: UserActionType;
  payload: User;
}

export interface UserContextValue {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

export const AuthContext = React.createContext<UserContextValue | null>(null);

export const authReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case UserActionType.LOGIN:
      return { user: action.payload };
    case UserActionType.LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    user: null,
  });

  React.useEffect(() => {
    const useStorage = localStorage.getItem("user");
    const user: { email: string; token: string } | null = useStorage
      ? JSON.parse(useStorage)
      : null;

    if (user) {
      dispatch({ type: UserActionType.LOGIN, payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};
