import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { useUpdateUserPassword } from "@/services/admin.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface PasswordChangeProps {
  id: number;
}

const schema = z.object({
  id: z.number(),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" }),
});

type FormPasswordChangeFields = z.infer<typeof schema>;

function PasswordChange({ id }: PasswordChangeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // control,
  } = useForm<FormPasswordChangeFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useUpdateUserPassword();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: FormPasswordChangeFields) => {
    await mutateAsync(data, {
      onSuccess: () => {
        closeModal();
      },
      onError: () => {
        closeModal();
      },
    });
  };

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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="number"
            hidden
            value={id}
            {...register("id", { valueAsNumber: true })}
          />
          <Input
            label="Mật khẩu mới"
            type="password"
            placeholder="Nhập mật khẩu mới"
            {...register("password")}
            errorMessage={errors.password?.message}
          />
          <div className="flex flex-wrap sm:flex-nowrap gap-3 mt-4">
            <Button
              type="button"
              className="w-full"
              variant="ghost"
              onClick={closeModal}
            >
              Trở lại
            </Button>
            <Button type="submit" className="w-full">
              {isPending ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </form>
      </ConfirmModal>
    </>
  );
}

export default PasswordChange;
