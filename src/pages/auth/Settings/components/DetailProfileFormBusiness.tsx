import Input from "@/components/Input/Input";
import Textarea from "@/components/Input/Textarea";
import { AccountProfile } from "@/models/account.interface";
import Dropdown from "@/components/Dropdown/Dropdown";
import { useGetCities } from "@/services/city.service";
import { useGetCategories } from "@/services/category.service";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateProfileBusiness } from "@/services/account.service";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import Button from "@/components/Buttons/Button";
import ImagesDisplay from "@/components/ImagesUpload/ImagesDisplay";
import ImagesUpload from "@/components/ImagesUpload/ImagesUpload";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface DetailProfileFormProps {
  detail: AccountProfile;
}

const schema = z
  .object({
    images: z.string(),
    firstName: z
      .string()
      .min(1, { message: "Tên không được để trống" })
      .max(50, { message: "Tên không được dài quá 50 ký tự" }),
    cityId: z
      .number({ required_error: "Thành phố không được để trống" })
      .min(1, { message: "Vui lòng chọn một thành phố" }),
    address: z
      .string()
      .max(250, { message: "Địa chỉ không được dài quá 250 ký tự" })
      .optional(),
    shortDescription: z
      .string()
      .min(1, { message: "Mô tả ngắn không được để trống" })
      .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" }),
    description: z.string().optional(),
    phone: z
      .string()
      .regex(/^\d{1,15}$/, { message: "Số điện thoại không hợp lệ" })
      .optional(),
    openHour: z
      .number()
      .min(0, { message: "Giờ mở cửa không được nhỏ hơn 0" })
      .max(24, { message: "Giờ mở cửa không được lớn hơn 24" })
      .optional(),
    closeHour: z
      .number()
      .min(1, { message: "Giờ đóng cửa không được nhỏ hơn 1" })
      .max(24, { message: "Giờ đóng cửa không được lớn hơn 24" })
      .optional(),
    categoryIds: z
      .array(z.number(), { required_error: "Sở thích không được để trống" })
      .min(1, { message: "Chọn ít nhất một sở thích" })
      .max(3, { message: "Chọn tối đa 3 sở thích" }),
    imageFiles: z
      .array(z.instanceof(File))
      .max(10, { message: "Tải lên tối đa 10 hình ảnh" }),
  })
  .refine((data) => (data.closeHour ?? 0) > (data.openHour ?? 0), {
    message: "Giờ đóng cửa phải lớn hơn giờ mở cửa",
    path: ["closeHour"],
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
      firstName: detail.firstName,
      cityId: detail.city.id,
      shortDescription: detail.shortDescription,
      description: detail.description ?? undefined,
      categoryIds: detail.categories.map((category) => category.id),
      phone: detail.phone,
      address: detail.address,
      openHour: detail.openHour === 0 ? 8 : detail.openHour,
      closeHour: detail.closeHour === 0 ? 17 : detail.closeHour,
    },
  });

  // console.log(detail);

  // Log validation errors
  // useEffect(() => {
  //   if (Object.keys(errors).length > 0) {
  //     console.error("Validation Errors:", errors);
  //   }
  // }, [errors]);

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

  const { isPending, mutateAsync } = useUpdateProfileBusiness();

  // Update the form when the detail prop changes
  useEffect(() => {
    reset({
      images: detail.images.join(";"),
      firstName: detail.firstName,
      cityId: detail.city.id,
      shortDescription: detail.shortDescription,
      description: detail.description ?? undefined,
      categoryIds: detail.categories.map((category) => category.id),
      phone: detail.phone,
      address: detail.address,
      openHour: detail.openHour === 0 ? 8 : detail.openHour,
      closeHour: detail.closeHour === 0 ? 17 : detail.closeHour,
    });
    setDisplayImages(detail.images);
  }, [detail, reset]);

  const onSubmit = async (data: FormUpdateProfileFields) => {
    const totalImages = data.imageFiles.length + displayImages.length;
    if (totalImages > 10) {
      toast.error("Tối đa 10 hình ảnh");
      return;
    }

    // Include kept images
    const finalData = {
      ...data,
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
          label="Tên dịch vụ"
          placeholder="Nhập tên dịch vụ"
          {...register("firstName")}
          errorMessage={errors.firstName?.message}
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
        <Input
          type="number"
          min={1}
          max={24}
          label="Giờ mở cửa (0-24h)"
          placeholder="Nhập giờ mở cửa"
          {...register("openHour", { valueAsNumber: true })}
          errorMessage={errors.openHour?.message}
        />
        <Input
          type="number"
          min={1}
          max={24}
          label="Giờ đóng cửa (1-24h)"
          placeholder="Nhập giờ đóng cửa"
          {...register("closeHour", { valueAsNumber: true })}
          errorMessage={errors.closeHour?.message}
        />
      </div>
      <Input
        label="Số điện thoại (liên tiếp, không khoảng trắng)"
        placeholder="Nhập số điện thoại..."
        {...register("phone")}
        errorMessage={errors.phone?.message}
      />
      <Input
        label="Địa chỉ"
        placeholder="Nhập địa chỉ..."
        {...register("address")}
        errorMessage={errors.address?.message}
      />
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
