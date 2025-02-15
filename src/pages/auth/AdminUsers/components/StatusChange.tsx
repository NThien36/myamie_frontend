import Button from "@/components/Buttons/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import ConfirmModal from "@/components/Modals/ConfirmModal";
import { AccountStatusEnum } from "@/models/app.interface";
import { useUpdateUserStatus } from "@/services/admin.service";
import { USERS_ADMIN_QUERY_KEY } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface StatusChangeProps {
  id: number;
}

const schema = z.object({
  id: z.number(),
  status: z.number({ required_error: "Trạng thái không được để trống" }),
});

type FormStatusChangeFields = z.infer<typeof schema>;

function StatusChange({ id }: StatusChangeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, control } = useForm<FormStatusChangeFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useUpdateUserStatus();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onSubmit = async (data: FormStatusChangeFields) => {
    await mutateAsync(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [USERS_ADMIN_QUERY_KEY] });
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
        Trạng thái
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
          <Dropdown
            label="Trạng thái"
            options={[
              { name: "Kích hoạt", id: AccountStatusEnum.ACTIVATED },
              { name: "Khóa", id: AccountStatusEnum.SUSPENDED },
            ]}
            name="status"
            control={control}
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
              {isPending ? "Đang thay đổi..." : "Thay đổi"}
            </Button>
          </div>
        </form>
      </ConfirmModal>
    </>
  );
}

export default StatusChange;
