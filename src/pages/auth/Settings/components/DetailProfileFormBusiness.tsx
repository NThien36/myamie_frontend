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
import { useUpdatePorfile } from "@/services/account.service";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import Button from "@/components/Buttons/Button";
import ImagesDisplay from "@/components/ImagesUpload/ImagesDisplay";
import ImagesUpload from "@/components/ImagesUpload/ImagesUpload";
import { useState } from "react";
import toast from "react-hot-toast";

interface DetailProfileFormProps {
  detail: AccountProfile;
}

const schema = z.object({
  images: z.string(),
  firstName: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài quá 50 ký tự" }),
  cityId: z
    .number({ required_error: "Thành phố không được để trống" })
    .min(1, { message: "Vui lòng chọn một thành phố" }),
  shortDescription: z
    .string()
    .min(1, { message: "Mô tả ngắn không được để trống" })
    .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" }),
  description: z.string().optional(),
  categoryIds: z
    .array(z.number(), { required_error: "Sở thích không được để trống" })
    .min(1, { message: "Chọn ít nhất một sở thích" })
    .max(3, { message: "Chọn tối đa 3 sở thích" }),
  imageFiles: z
    .array(z.instanceof(File))
    .max(10, { message: "Tải lên tối đa 10 hình ảnh" }),
});

type FormUpdateProfileFields = z.infer<typeof schema>;

function DetailProfileForm({ detail }: DetailProfileFormProps) {
  const [displayImages, setDisplayImages] = useState<string[]>(detail.images);
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
      images: detail.images.join(";"),
      firstName: detail.firstName,
      cityId: detail.city.id,
      shortDescription: detail.shortDescription,
      description: detail.description ?? undefined,
      categoryIds: detail.categories.map((category) => category.id),
    },
  });

  console.log(detail);

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
