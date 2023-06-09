import { createContext } from "react";
import { User } from "../../../types/user/User";
import { NavigateFunction } from "react-router-dom";
import {
  UserLoginRequest,
  UserRegisterRequest,
  UserUpdateRequest,
} from "../../../types";
import { FormikValues } from "formik";

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (data: UserLoginRequest) => Promise<boolean>;
  register: (data: UserRegisterRequest) => Promise<boolean>;
  update: (data: UserUpdateRequest, validation: FormikValues) => Promise<void>;
  logout: (navigate: NavigateFunction) => void;
};

export const AuthContext = createContext<AuthContextType>(null);
