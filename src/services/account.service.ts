import { resetPassword } from "@/apis/account.api";
import { handleMessageError } from "@/utils/errorUtils";
import { useMutation } from "@tanstack/react-query";
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
