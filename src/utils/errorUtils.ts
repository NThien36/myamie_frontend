import { toast } from "react-hot-toast";
import axios from "axios";

export const handleMutationError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau"
    );
  } else {
    toast.error("Đã xảy ra lỗi không xác định");
  }
};

// Generalized Axios error handler for other Axios requests
export const handleMessageError = (error: unknown, message: string) => {
  if (axios.isAxiosError(error)) {
    // Check for 403 status code
    if (error.response?.status === 403) {
      toast.error("Bạn không có quyền truy cập");
    } else {
      const errorMessage = error.response?.data || message;
      toast.error(errorMessage);
    }
  } else {
    toast.error("Đã xảy ra lỗi không xác định");
  }
};

export const extractChatErrorMessage = (err: any): string => {
  if (err && typeof err.message === "string") {
    // Check if the error message contains "HubException"
    const match = err.message.match(/HubException: (.*)$/);
    if (match && match[1]) {
      return match[1]; // Extract the meaningful message
    }
    return err.message; // Fallback to the full message
  }
  return "An unexpected error occurred.";
};
