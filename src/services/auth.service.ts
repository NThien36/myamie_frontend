import { loginByEmail, signup, signupBusiness } from "@/apis/auth.api";
import { login } from "@/store/auth/auth.slice";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { handleMutationError } from "@/utils/errorUtils";
import toast from "react-hot-toast";

export const useLoginByEmail = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginByEmail,
    onSuccess: (data) => {
      dispatch(login(data.data));
    },
    onError: handleMutationError,
  });
};

export const useSignup = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      toast.success("Đăng ký thành công, xác nhận email ngay");
    },
    onError: handleMutationError,
  });
};

export const useSignupBusiness = () => {
  return useMutation({
    mutationFn: signupBusiness,
    onSuccess: () => {
      toast.success("Đăng ký thành công");
    },
    onError: handleMutationError,
  });
};
