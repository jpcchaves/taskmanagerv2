import http from "../../../../../http-common/http";
import { AxiosResponse } from "axios";
import { UserLoginRequest } from "../../../../../types/user/login/UserLoginRequest";
import { UserLoginResponse } from "../../../../../types/user/login/UserLoginResponse";
import { AuthService } from "../models/AuthService";
import { UserRegisterRequest } from "../../../../../types/user/register/UserRegisterRequest";
import { UserRegisterResponse } from "../../../../../types/user/register/UserRegisterResponse";
import { UserUpdateRequest } from "types";

class AuthServiceImpl implements AuthService {
  async login(
    data: UserLoginRequest
  ): Promise<AxiosResponse<UserLoginResponse, UserLoginRequest>> {
    return http.post<UserLoginResponse>(
      import.meta.env.VITE_API_LOGIN_ENDPOINT,
      data
    );
  }

  async register(
    data: UserRegisterRequest
  ): Promise<AxiosResponse<UserRegisterResponse, UserRegisterRequest>> {
    return http.post<UserRegisterResponse>(
      import.meta.env.VITE_API_REGISTER_ENDPOINT,
      data
    );
  }

  async update(
    data: UserUpdateRequest
  ): Promise<AxiosResponse<UpdateUseResponse, UserUpdateRequest>> {
    const updatedUser = {
      name: data.name,
      password: data.password,
      currentPassword: data.currentPassword,
    };

    return http.put<UpdateUseResponse>(
      import.meta.env.VITE_API_UPDATE_USER_ENDPOINT + `/${data.id}`,
      updatedUser
    );
  }
}

export type UpdateUseResponse = {
  message: string;
};

export default new AuthServiceImpl();
