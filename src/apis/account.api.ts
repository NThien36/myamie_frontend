import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

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
