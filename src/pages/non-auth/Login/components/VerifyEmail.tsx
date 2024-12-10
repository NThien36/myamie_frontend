import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import {
  useRequestEmailVerification,
  useVerifyEmail,
} from "@/services/email.service";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESEND_DELAY = 60;

function VerifyEmail() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutateAsync: requestVerification, isPending: isRequesting } =
    useRequestEmailVerification();
  const { mutateAsync: verify, isPending: isVerifying } = useVerifyEmail();

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

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
    <>
      <p
        className="text-xs hover:underline hover:cursor-pointer"
        onClick={openModal}
      >
        Xác minh email
      </p>
      <ConfirmModal
        isOpen={isOpen}
        onClose={closeModal}
        className="w-11/12 sm:w-1/2 xl:w-1/3"
      >
        <p className="text-xl font-semibold text-center">XÁC MINH EMAIL</p>
        <p className="text-gray-700 text-center mt-2">
          Vui lòng xác nhận email để xác minh tài khoản
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
          onClick={handleRequestVerification}
          disabled={isRequesting || timeLeft > 0}
        >
          {isRequesting
            ? "Đang gửi mã..."
            : timeLeft > 0
            ? `Gửi lại sau ${timeLeft}s`
            : "Gửi mã"}
        </Button>
        <Input
          placeholder="Nhập mã tại đây..."
          type="number"
          className="mt-5"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button
          className="w-full mt-4"
          shape="rounded"
          onClick={handleVerifyEmail}
          disabled={isVerifying}
        >
          {isVerifying ? "Đang xác minh..." : "Xác minh"}
        </Button>
      </ConfirmModal>
    </>
  );
}

export default VerifyEmail;
