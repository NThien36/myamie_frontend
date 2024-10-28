import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { useState } from "react";
import ConfirmEmail from "./components/ConfirmEmail";

function Signup() {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <p className="text-lg font-semibold">Đăng ký</p>
      <form action="" className="mt-3 space-y-3">
        <div className="flex gap-3">
          <Input label="Họ" placeholder="Nhập họ..." />
          <Input label="Tên" placeholder="Nhập tên..." />
        </div>
        <Input
          label="Email"
          type="email"
          placeholder="Nhập tài khoản Email..."
        />
        <Input
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu..."
        />
        <Button
          type="submit"
          variant="outline"
          shape="rounded"
          className="w-full"
        >
          Đăng ký
        </Button>
      </form>
      <ConfirmEmail
        isOpen={isOpen}
        closeModal={closeModal}
        email="minhbee203@gmail.com"
      />
    </>
  );
}

export default Signup;
