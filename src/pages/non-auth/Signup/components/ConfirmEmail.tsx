import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import {
  useRequestEmailVerification,
  useVerifyEmail,
} from "@/services/email.service";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ConfirmEmailProps {
  isOpen: boolean;
  closeModal: () => void;
  email: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_DELAY = 60;

function ConfirmEmail({ isOpen, closeModal, email }: ConfirmEmailProps) {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutateAsync: requestVerification, isPending: isRequesting } =
    useRequestEmailVerification();
  const { mutateAsync: verify, isPending: isVerifying } = useVerifyEmail();

  // Handle countdown timer for resend delay
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleRequestVerification = async () => {
    if (!email) {
      toast.error("Vui lòng nhập email");
    } else if (!emailRegex.test(email)) {
      toast.error("Vui lòng nhập email hợp lệ");
    } else {
      await requestVerification(email);
      setTimeLeft(RESEND_DELAY);
    }
  };

  const handleVerifyEmail = async () => {
    if (email && code) {
      await verify(
        { email, code },
        {
          onSuccess: closeModal,
        }
      );
    } else {
      toast.error("Vui lòng nhập email và mã xác minh");
    }
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={closeModal}
      className="w-11/12 sm:w-1/2 lg:w-1/3"
    >
      <p className="text-xl font-semibold text-center">XÁC NHẬN EMAIL</p>
      <p className="text-gray-700 text-center mt-2">
        MYAmie đã gửi mã qua {email}
      </p>
      <Input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Nhập mã tại đây..."
        type="number"
        className="mt-5"
      />
      <Button
        onClick={handleVerifyEmail}
        disabled={isVerifying}
        variant="outline"
        className="w-full mt-4"
        shape="rounded"
      >
        {isVerifying ? "Đang xác minh..." : "Xác minh"}
      </Button>
      <div className="flex flex-wrap justify-center gap-1 mt-3">
        <p>Chưa nhận được email?</p>
        <p
          onClick={handleRequestVerification}
          className="text-primary hover:underline"
        >
          {isRequesting
            ? "Đang gửi mã..."
            : timeLeft > 0
            ? `Gửi lại sau ${timeLeft}s`
            : "Gửi lại"}
        </p>
      </div>
    </ConfirmModal>
  );
}

export default ConfirmEmail;
