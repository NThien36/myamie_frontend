import {
  AccountProfileResponse,
  ChangePasswordParams,
  UpdateProfileParams,
} from "@/models/account.interface";
import fetchAPI from "@/utils/fetchApi";
import createFormData from "@/utils/formatDataUtils";
import { AxiosResponse } from "axios";
import { date } from "zod";

export const resetPassword = async ({
  email,
  code,
  newPassword,
}: {
  email: string;
  code: string;
  newPassword: string;
}) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Account/reset-password",
    method: "post",
    data: { email, code, newPassword },
  });

  return response.data;
};

export const updateCover = async (image: File) => {
  const formData = createFormData({ imageFile: image });

  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Account/update-cover",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response.data;
};

export const updateAvatar = async (image: File) => {
  const formData = createFormData({ imageFile: image });

  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Account/update-avatar",
    method: "put",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });

  return response.data;
};

export const getProfile = async () => {
  const response: AxiosResponse<AccountProfileResponse> =
    await fetchAPI.request({
      url: "/Account/get-profile",
      method: "get",
    });

  return response.data;
};

export const updateProfile = async (data: UpdateProfileParams) => {
  const formData = createFormData(data);

  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Account/update-profile",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    method: "put",
    data: formData,
  });

  return response.data;
};

export const changePassword = async (data: ChangePasswordParams) => {
  const response: AxiosResponse<string> = await fetchAPI.request({
    url: "/Account/change-password",
    method: "put",
    data,
  });

  return response.data;
};
