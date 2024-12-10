import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useResetPassword } from "@/services/account.service";
import { useRequestEmailResetPassword } from "@/services/email.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_DELAY = 60;

function ForgetPassword() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutateAsync: requestEmailReset, isPending: isRequesting } =
    useRequestEmailResetPassword();
  const { mutateAsync: resetPassword, isPending: isResetting } =
    useResetPassword();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  // Handle email reset request
  const handleSendCode = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email");
    } else if (!emailRegex.test(email)) {
      toast.error("Vui lòng nhập email hợp lệ");
    } else {
      await requestEmailReset(email);
      setTimeLeft(RESEND_DELAY);
    }
  };

  // Timer to handle delay between "send code" requests
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  // Handle password reset submission
  const handleResetPassword = async () => {
    if (email && code && newPassword && newPassword.length >= 6) {
      await resetPassword(
        { email, code, newPassword },
        {
          onSuccess: closeModal,
        }
      );
    } else {
      toast.error(
        "Vui lòng nhập email, mã xác minh và mật khẩu (ít nhất 6 ký tự)"
      );
    }
  };

  return (
    <>
      <p
        className="text-xs hover:underline hover:cursor-pointer"
        onClick={openModal}
      >
        Quên mật khẩu
      </p>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        className="w-11/12 sm:w-1/2 xl:w-1/3"
      >
        <p className="text-xl font-semibold text-center">THAY ĐỔI MẬT KHẨU</p>
        <p className="text-gray-700 text-center mt-2">
          Vui lòng xác nhận email để cập nhật mât khẩu mới
        </p>
        <Input
          placeholder="Nhập email tại đây..."
          className="mt-5"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          variant="outline"
          className="w-full mt-4"
          shape="rounded"
          onClick={handleSendCode}
          disabled={isRequesting || timeLeft > 0}
        >
          {isRequesting
            ? "Đang gửi mã..."
            : timeLeft > 0
            ? `Gửi lại sau ${timeLeft}s`
            : "Gửi mã (Optional)"}
        </Button>
        <Input
          placeholder="Nhập mã tại đây..."
          type="number"
          className="mt-5"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Input
          placeholder="Nhập mật khẩu mới..."
          type="password"
          className="mt-3"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          className="w-full mt-4"
          shape="rounded"
          onClick={handleResetPassword}
          disabled={isResetting}
        >
          {isResetting ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </Button>
      </ConfirmModal>
    </>
  );
}

export default ForgetPassword;
