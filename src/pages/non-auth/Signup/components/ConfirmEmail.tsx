import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { Link } from "react-router-dom";

interface ConfirmEmailProps {
  isOpen: boolean;
  closeModal: () => void;
  email: string;
}

function ConfirmEmail({ isOpen, closeModal, email }: ConfirmEmailProps) {
  return (
    <ConfirmModal isOpen={isOpen} onClose={closeModal}>
      <p className="text-xl font-semibold text-center">XÁC NHẬN EMAIL</p>
      <p className="text-gray-700 text-center mt-2">
        MYAmie đã gửi mã qua {email}
      </p>
      <Input placeholder="Nhập mã tại đây..." type="number" className="mt-5" />
      <Button variant="outline" className="w-full mt-4" shape="rounded">
        Xác nhận
      </Button>
      <div className="flex justify-center gap-1 mt-3">
        <p>Chưa nhận được email?</p>
        <Link to="/resend-email" className="text-primary hover:underline">
          Gửi lại
        </Link>
      </div>
    </ConfirmModal>
  );
}

export default ConfirmEmail;
