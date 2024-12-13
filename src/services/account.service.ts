import {
  changePassword,
  getProfile,
  resetPassword,
  updateAvatar,
  updateCover,
  updateProfile,
} from "@/apis/account.api";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: resetPassword,
    onSuccess: (data) => {
      const successMessage =
        typeof data === "string" ? data : "Đặt lại mật khẩu thành công!";
      toast.success(successMessage);
    },
    onError: (error) => {
      handleMessageError(error, "Mã xác minh không hợp lệ hoặc đã hết hạn");
    },
  });
};

export const useUpdateCover = () => {
  return useMutation({
    mutationFn: updateCover,
    onSuccess: () => {
      toast.success("Cập nhật ảnh bìa thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật ảnh bìa");
    },
  });
};

export const useUpdateAvatar = () => {
  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      toast.success("Cập nhật ảnh đại diện thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật ảnh đại diện");
    },
  });
};

export const useGetProfile = () => {
  return useQuery({
    queryKey: [PROFILE_QUERY_KEY],
    queryFn: getProfile,
  });
};

export const useUpdatePorfile = () => {
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast.success("Cập nhật thông tin thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Xảy ra lỗi khi cập nhật thông tin");
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Đổi mật khẩu thành công");
    },
    onError: (error) => {
      handleMessageError(error, "Mật khẩu cũ không đúng");
    },
  });
};
