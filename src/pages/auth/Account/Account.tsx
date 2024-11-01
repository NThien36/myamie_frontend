import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";

function Account() {
  return (
    <div className="auth-container w-full xl:w-2/3">
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <Input
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới..."
        />
        <Input
          type="password"
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới..."
        />
      </div>
      <Input
        className="mt-4"
        type="password"
        label="Mật khẩu cũ"
        placeholder="Nhập mật khẩu cũ..."
      />
      <div className="flex justify-end mt-2">
        <Button className="mt-3 text-xs" variant="outline">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

export default Account;
