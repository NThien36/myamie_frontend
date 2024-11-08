import { toast } from "react-hot-toast";
import axios from "axios";

export const handleMutationError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại sau."
    );
  } else {
    toast.error("Đã xảy ra lỗi không xác định.");
  }
};
