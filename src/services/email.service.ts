import {
  requestEmailResetPassword,
  requestEmailVerification,
  verifyEmail,
} from "@/apis/emai.api";
import { handleMessageError, handleMutationError } from "@/utils/errorUtils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useRequestEmailVerification = () => {
  return useMutation({
    mutationKey: ["requestEmailVerification"],
    mutationFn: requestEmailVerification,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
      } else {
        toast.error("Failed to send verification email.");
      }
    },
    onError: handleMutationError,
  });
};

export const useRequestEmailResetPassword = () => {
  return useMutation({
    mutationKey: ["requestEmailResetPassword"],
    mutationFn: requestEmailResetPassword,
    onSuccess: (data) => {
      if (data.isSuccess) {
        toast.success(data.message);
      } else {
        toast.error("Failed to send reset password email.");
      }
    },
    onError: handleMutationError,
  });
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: ["verifyEmail"],
    mutationFn: verifyEmail,
    onSuccess: (data) => {
      // Display success message from backend if present
      const successMessage =
        typeof data === "string" ? data : "Xác minh email thành công!";
      toast.success(successMessage);
    },
    onError: (error) => {
      handleMessageError(error, "Mã xác minh không hợp lệ hoặc đã hết hạn");
    },
  });
};
