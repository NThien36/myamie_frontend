import Button from "@/components/Buttons/Button";
import Divider from "@/components/Divider/Divider";
import Input from "@/components/Input/Input";
import { Link } from "react-router-dom";

function Login() {
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
        <Link to="/forgot" className="block">
          <p className="text-xs text-center underline">Quên mật khẩu</p>
        </Link>
      </form>
    </>
  );
}

export default Login;
