import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useState } from "react";

function PasswordChange() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        onClick={openModal}
        className="w-fit hover:underline hover:text-primary font-medium text-gray-500"
      >
        Mật khẩu
      </button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="w-11/12 md:w-96"
      >
        <Input
          label="Mật khẩu mới"
          type="password"
          placeholder="Nhập mật khẩu mới"
        />
        <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-4">
          <Button className="w-full" variant="ghost" onClick={closeModal}>
            Trở lại
          </Button>
          <Button className="w-full">Đồng ý</Button>
        </div>
      </ConfirmModal>
    </>
  );
}

export default PasswordChange;
