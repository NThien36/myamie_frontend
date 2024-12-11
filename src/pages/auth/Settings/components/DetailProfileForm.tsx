import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import CharacteristicSelect from "./CharacteristicSelect";
import { AccountProfile } from "@/models/account.interface";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useGetCities } from "@/services/city.service";
import { useGetCategories } from "@/services/category.service";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useUpdatePorfile } from "@/services/account.service";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import { formatDateForInput } from "@/utils/dateTimeUtils";
import Button from "@/components/Buttons/Button";

interface DetailProfileFormProps {
  detail: AccountProfile;
}

const schema = z.object({
  lastName: z
    .string()
    .min(1, { message: "Họ không được để trống" })
    .max(50, { message: "Họ không được dài quá 50 ký tự" }),
  firstName: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài quá 50 ký tự" }),
  dateOfBirth: z.string(),
  cityId: z
    .number({ required_error: "Thành phố không được để trống" })
    .min(1, { message: "Vui lòng chọn một thành phố" }),
  shortDescription: z
    .string()
    .min(1, { message: "Mô tả ngắn không được để trống" })
    .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" }),
  description: z.string(),
  categoryIds: z
    .array(z.number(), { required_error: "Sở thích không được để trống" })
    .min(1, { message: "Chọn ít nhất một sở thích" })
    .max(3, { message: "Chọn tối đa 3 sở thích" }),
  characteristics: z
    .array(z.string())
    .max(5, { message: "Chọn tối đa 5 đặc điểm" }),
});

type FormUpdateProfileFields = z.infer<typeof schema>;

function DetailProfileForm({ detail }: DetailProfileFormProps) {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormUpdateProfileFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      lastName: detail.lastName,
      firstName: detail.firstName,
      dateOfBirth: formatDateForInput(detail.dateOfBirth),
      cityId: detail.city.id,
      shortDescription: detail.shortDescription,
      description: detail.description,
      categoryIds: detail.categories.map((category) => category.id),
      characteristics: detail.characteristics,
    },
  });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategories();
  const {
    data: cities,
    isLoading: isLoadingCities,
    isError: isErrorCities,
  } = useGetCities();

  const { isPending, mutateAsync } = useUpdatePorfile();

  const onSubmit = async (data: FormUpdateProfileFields) => {
    await mutateAsync(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Họ"
          placeholder="Nhập họ"
          {...register("lastName")}
          errorMessage={errors.lastName?.message}
        />
        <Input
          label="Tên"
          placeholder="Nhập tên"
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
        />
        <Input
          type="date"
          label="Ngày sinh"
          placeholder="Nhập ngày sinh..."
          {...register("dateOfBirth")}
          errorMessage={errors.dateOfBirth?.message}
        />
        <Dropdown
          label="Thành phố"
          options={cities?.data}
          isLoading={isLoadingCities}
          isError={isErrorCities}
          placeHolder="Chọn thành phố"
          control={control}
          name="cityId"
        />
      </div>
      <Input
        label="Mô tả ngắn"
        placeholder="Nhập mô tả..."
        {...register("shortDescription")}
        errorMessage={errors.shortDescription?.message}
      />
      <Textarea
        label="Mô tả"
        placeholder="Nhập mô tả chi tiết..."
        {...register("description")}
      />
      <Dropdown
        label="Thể loại (3)"
        options={categories?.data}
        isLoading={isLoadingCategories}
        isError={isErrorCategories}
        isMulti={true}
        isClearable={true}
        maxSelectItems={3}
        name="categoryIds"
        control={control}
      />
      <Controller
        name="characteristics"
        control={control}
        render={({ field }) => (
          <CharacteristicSelect
            currentCharacteristics={field.value}
            onChange={field.onChange}
            errorMessage={errors.characteristics?.message}
          />
        )}
      />
      <Button
        disabled={isPending}
        type="submit"
        variant="outline"
        className="mt-10 ml-auto w-fit text-xs font-medium"
      >
        {isPending ? "Đang cập nhật..." : "Lưu thay đổi"}
      </Button>
    </form>
  );
}

export default DetailProfileForm;
