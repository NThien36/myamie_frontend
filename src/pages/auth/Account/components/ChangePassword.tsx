import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { useChangePassword } from "@/services/account.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Mật khẩu cũ không được để trống" })
      .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
    newPassword: z
      .string()
      .min(1, { message: "Mật khẩu mới không được để trống" })
      .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Mật khẩu mới không được để trống" })
      .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type FormChangePassFields = z.infer<typeof schema>;

function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormChangePassFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useChangePassword();

  const onSubmit = async (data: FormChangePassFields) => {
    const finalData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    await mutateAsync(finalData, {
      onSuccess: () => {
        reset();
      },
      onError: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="auth-container w-full xl:w-2/3"
    >
      <div className="flex flex-wrap md:flex-nowrap gap-6">
        <Input
          type="password"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới..."
          {...register("newPassword")}
          errorMessage={errors.newPassword?.message}
        />
        <Input
          type="password"
          label="Nhập lại mật khẩu mới"
          placeholder="Nhập lại mật khẩu mới..."
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
        />
      </div>
      <Input
        className="mt-4"
        type="password"
        label="Mật khẩu cũ"
        placeholder="Nhập mật khẩu cũ..."
        {...register("oldPassword")}
        errorMessage={errors.oldPassword?.message}
      />
      <div className="flex justify-end mt-2">
        <Button
          disabled={isPending}
          type="submit"
          className="mt-3 text-xs"
          variant="outline"
        >
          {isPending ? "Đang cập nhật..." : "Cập nhật"}
        </Button>
      </div>
    </form>
  );
}

export default ChangePassword;
