import { ApiResponse } from "@/models/app.interface";
import {
  LoginResponse,
  SignupBusinessPayload,
  SignupPayload,
} from "./../models/auth.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const loginByEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response: AxiosResponse<LoginResponse> = await fetchAPI.request({
    method: "post",
    url: "/Auth/login",
    data: { email, password },
  });
  return response.data;
};

export const loginByFacebook = async (accessToken: string) => {
  const response: AxiosResponse<LoginResponse> = await fetchAPI.request({
    url: "/Auth/login-facebook",
    method: "post",
    data: {
      accessToken,
    },
  });
  return response.data;
};

export const signup = async (payload: SignupPayload) => {
  const response: AxiosResponse<ApiResponse> = await fetchAPI.request({
    method: "post",
    url: "/Auth/signup",
    data: payload,
  });
  return response.data;
};

export const signupBusiness = async (payload: SignupBusinessPayload) => {
  const response: AxiosResponse<ApiResponse> = await fetchAPI.request({
    method: "post",
    url: "/Auth/signup-business",
    data: payload,
  });
  return response.data;
};
