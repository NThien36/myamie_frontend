import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useState } from "react";

function VerifyEmail() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

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
        <Input placeholder="Nhập email tại đây..." className="mt-5" />
        <Button variant="outline" className="w-full mt-4" shape="rounded">
          Gửi mã
        </Button>
        <Input
          placeholder="Nhập mã tại đây..."
          type="number"
          className="mt-5"
        />
        <Button className="w-full mt-4" shape="rounded">
          Xác minh
        </Button>
      </ConfirmModal>
    </>
  );
}

export default VerifyEmail;
