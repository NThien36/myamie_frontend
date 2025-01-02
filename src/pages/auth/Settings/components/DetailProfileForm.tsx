import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import CharacteristicSelect from "./CharacteristicSelect";
import {
  AccountProfile,
  UpdateProfileBusinessParams,
} from "@/models/account.interface";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useGetCities } from "@/services/city.service";
import { useGetCategories } from "@/services/category.service";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfile } from "@/services/account.service";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import { formatDateForInput } from "@/utils/dateTimeUtils";
import Button from "@/components/Buttons/Button";
import ImagesDisplay from "@/components/ImagesUpload/ImagesDisplay";
import ImagesUpload from "@/components/ImagesUpload/ImagesUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DetailProfileFormProps {
  detail: AccountProfile;
}

const schema = z.object({
  images: z.string(),
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
    .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" })
    .optional()
    .nullable(),
  description: z.string().optional().nullable(),
  categoryIds: z
    .array(z.number(), { required_error: "Sở thích không được để trống" })
    .min(1, { message: "Chọn ít nhất một sở thích" })
    .max(3, { message: "Chọn tối đa 3 sở thích" }),
  characteristics: z
    .array(z.string())
    .max(5, { message: "Chọn tối đa 5 đặc điểm" }),
  imageFiles: z
    .array(z.instanceof(File))
    .max(10, { message: "Tải lên tối đa 10 hình ảnh" }),
});

type FormUpdateProfileFields = z.infer<typeof schema>;

function DetailProfileForm({ detail }: DetailProfileFormProps) {
  const [displayImages, setDisplayImages] = useState<string[]>(detail.images);
  const queryClient = useQueryClient();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormUpdateProfileFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      images: detail.images.join(";"),
      lastName: detail.lastName,
      firstName: detail.firstName,
      dateOfBirth: formatDateForInput(detail.dateOfBirth),
      cityId: detail.city?.id ?? 0,
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

  const { isPending, mutateAsync } = useUpdateProfile();

  // Update the form when the detail prop changes
  useEffect(() => {
    reset({
      images: detail.images.join(";"),
      lastName: detail.lastName,
      firstName: detail.firstName,
      dateOfBirth: formatDateForInput(detail.dateOfBirth),
      cityId: detail.city?.id ?? 0,
      shortDescription: detail.shortDescription,
      description: detail.description,
      categoryIds: detail.categories.map((category) => category.id),
      characteristics: detail.characteristics,
    });

    // Update the displayImages state
    setDisplayImages(detail.images);
  }, [detail, reset]);

  const onSubmit = async (data: FormUpdateProfileFields) => {
    const totalImages = data.imageFiles.length + displayImages.length;
    if (totalImages > 10) {
      toast.error("Tối đa 10 hình ảnh");
      return;
    }

    // Include kept images
    const finalData: UpdateProfileBusinessParams = {
      ...data,
      shortDescription: data.shortDescription ?? "",
      description: data.description ?? "",
      keptImages: displayImages, // Add kept images
    };

    await mutateAsync(finalData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
      },
    });
  };

  // Remove display image
  const handleRemoveDisplayImage = (index: number) => {
    setDisplayImages((prev) => prev.filter((_, i) => i !== index));
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
      <ImagesDisplay
        images={displayImages}
        onRemove={handleRemoveDisplayImage}
      />
      <ImagesUpload
        control={control}
        name="imageFiles"
        limit={10 - displayImages.length}
      />
      <Input type="text" {...register("images")} hidden />
      <Button
        disabled={isPending}
        type="submit"
        variant="outline"
        className="ml-auto w-fit text-xs font-medium"
      >
        {isPending ? "Đang cập nhật..." : "Lưu thay đổi"}
      </Button>
    </form>
  );
}

export default DetailProfileForm;
