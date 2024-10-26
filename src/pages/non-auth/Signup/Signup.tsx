import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";

function Signup() {
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
    </>
  );
}

export default Signup;
