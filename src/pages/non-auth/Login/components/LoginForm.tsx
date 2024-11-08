import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginByEmail } from "@/services/auth.service";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu không được để trống" })
    .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
});

export type FormLoginFields = z.infer<typeof schema>;

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormLoginFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useLoginByEmail();

  const onSubmit = async (data: FormLoginFields) => {
    await mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-3">
      <Input
        {...register("email")}
        errorMessage={errors.email?.message}
        label="Email"
        type="email"
        placeholder="Nhập tài khoản Email..."
      />
      <Input
        {...register("password")}
        errorMessage={errors.password?.message}
        label="Mật khẩu"
        type="password"
        placeholder="Nhập mật khẩu..."
      />
      <Button
        disabled={isPending}
        type="submit"
        variant="outline"
        shape="rounded"
        className="w-full"
      >
        {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}

export default LoginForm;
