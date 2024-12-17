import {
  getPlacesByAdmin,
  getUsersByAdmin,
  updateUserPassword,
  updateUserStatus,
} from "@/apis/admin.api";
import { PlacesAdminParams, UsersAdminParams } from "@/models/admin.interface";
import { AccountStatusEnum } from "@/models/app.interface";
import {
  PLACES_ADMIN_QUERY_KEY,
  USERS_ADMIN_QUERY_KEY,
} from "@/utils/constants";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetUsersByAdmin = (params: UsersAdminParams) => {
  return useQuery({
    queryKey: [USERS_ADMIN_QUERY_KEY, params],
    queryFn: () => getUsersByAdmin(params),
  });
};

export const useUpdateUserStatus = () => {
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: AccountStatusEnum }) =>
      updateUserStatus(id, status),
    onSuccess: () => {
      toast.success("Cập nhật trạng thái thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật trạng thái");
    },
  });
};

export const useUpdateUserPassword = () => {
  return useMutation({
    mutationFn: ({ id, password }: { id: number; password: string }) =>
      updateUserPassword(id, password),
    onSuccess: () => {
      toast.success("Cập nhật mật khẩu thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật mật khẩu");
    },
  });
};

// === PLACE ===
export const useGetPlacesByAdmin = (params: PlacesAdminParams) => {
  return useQuery({
    queryKey: [PLACES_ADMIN_QUERY_KEY, params],
    queryFn: () => getPlacesByAdmin(params),
  });
};
