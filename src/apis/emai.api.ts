import { ApiResponse } from "@/models/app.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const requestEmailVerification = async (email: string) => {
  const response: AxiosResponse<ApiResponse> = await fetchAPI.request({
    url: "/Email/request-verification",
    method: "post",
    data: { email },
  });

  return response.data;
};

export const verifyEmail = async ({
  email,
  code,
}: {
  email: string;
  code: string;
}) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Email/verify-email",
    method: "post",
    data: { email, code },
  });

  return response.data;
};

export const requestEmailResetPassword = async (email: string) => {
  const response: AxiosResponse<ApiResponse> = await fetchAPI.request({
    url: "/Email/request-reset-password",
    method: "post",
    data: { email },
  });

  return response.data;
};
