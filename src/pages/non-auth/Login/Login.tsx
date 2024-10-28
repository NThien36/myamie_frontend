import Button from "@/components/Buttons/Button";
import Divider from "@/components/Divider/Divider";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <p className="text-lg font-semibold">Đăng nhập</p>
      <button className="mt-3 flex justify-center items-center gap-3 w-full p-2.5 bg-[#415E9A] text-white rounded-md hover:bg-opacity-90">
        <i className="fa-brands fa-facebook-f"></i>
        <p>Đăng nhập với Facebook</p>
      </button>
      <div className="flex items-center gap-3 mt-5">
        <Divider orientation="horizontal" />
        <p className="flex-none text-xs text-gray-500">
          Hoặc đăng nhập bằng Email
        </p>
        <Divider orientation="horizontal" />
      </div>
      <form action="" className="mt-3 space-y-3">
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
          Đăng nhập
        </Button>
        <p
          className="text-xs text-center underline hover:cursor-pointer"
          onClick={openModal}
        >
          Quên mật khẩu
        </p>
      </form>
      <ConfirmModal isOpen={isOpen} onClose={closeModal}>
        <p className="text-xl font-semibold text-center">THAY ĐỔI MẬT KHẨU</p>
        <p className="text-gray-700 text-center mt-2">
          Vui lòng xác nhận email để cập nhật mât khẩu mới
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
        <Input
          placeholder="Nhập mật khẩu mới..."
          type="password"
          className="mt-3"
        />
        <Button className="w-full mt-4" shape="rounded">
          Thay đổi
        </Button>
      </ConfirmModal>
    </>
  );
}

export default Login;
