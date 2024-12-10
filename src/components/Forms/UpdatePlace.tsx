import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Textarea from "../Input/Textarea";
import ImagesUpload from "../ImagesUpload/ImagesUpload";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "@/services/category.service";
import { useGetCities } from "@/services/city.service";
import { useGetPlaceById, useUpdatePlace } from "@/services/place.service";
import Loader from "../Loader/Loader";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { PLACE_DETAIL_QUERY_KEY, PLACE_QUERY_KEY } from "@/utils/constants";
import { useQueryClient } from "@tanstack/react-query";
import ImagesDisplay from "../ImagesUpload/ImagesDisplay";
import toast from "react-hot-toast";

interface UpdatePlaceProps {
  setIsPending: (value: boolean) => void;
  onCloseModal: () => void;
  id: number;
}

const schema = z.object({
  id: z.number(),
  images: z.string(),
  name: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài quá 50 ký tự" }),
  shortDescription: z
    .string()
    .min(1, { message: "Mô tả ngắn không được để trống" })
    .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" }),
  cityId: z
    .number({ required_error: "Thành phố không được để trống" })
    .min(1, { message: "Vui lòng chọn một thành phố" }),
  categoryIds: z
    .array(z.number(), { required_error: "Thể loại không được để trống" })
    .min(1, { message: "Chọn ít nhất một thể loại" })
    .max(3, { message: "Chọn tối đa 3 thể loại" }),
  address: z.string().min(1, { message: "Địa chỉ không được để trống" }),
  description: z
    .string()
    .min(1, { message: "Mô tả chi tiết không được để trống" }),
  imageFiles: z
    .array(z.instanceof(File))
    .max(10, { message: "Tải lên tối đa 10 hình ảnh" }),
});

type FormUpdatePlaceFields = z.infer<typeof schema>;

const UpdatePlace = forwardRef(
  ({ setIsPending, onCloseModal, id }: UpdatePlaceProps, ref) => {
    const queryClient = useQueryClient(); // Query client for invalidating queries
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<FormUpdatePlaceFields>({
      mode: "onBlur",
      resolver: zodResolver(schema),
    });

    const { data: placeData, isLoading, isError } = useGetPlaceById(id);
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

    const { isPending, mutateAsync } = useUpdatePlace();

    const place = placeData?.data;
    const [displayImages, setDisplayImages] = useState<string[]>([]);

    // Ensure hooks like `useEffect` are called unconditionally
    useEffect(() => {
      if (isError) {
        toast.error("Không thể tải dữ liệu, thử lại sau");
        onCloseModal(); // Close modal on error or missing place
      }
    }, [isError, onCloseModal]);

    // Update isPending in the parent component
    useEffect(() => {
      setIsPending(isPending);
    }, [isPending, setIsPending]);

    // Update display images when place changes
    useEffect(() => {
      if (place) {
        setDisplayImages(place.images);
      }
    }, [place]);

    // Remove display image
    const handleRemoveDisplayImage = (index: number) => {
      setDisplayImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Form submission
    const onSubmit = async (data: FormUpdatePlaceFields) => {
      const totalImages = data.imageFiles.length + displayImages.length;
      if (totalImages > 10 || totalImages < 1) {
        toast.error("Tải lên từ 1 đến 10 hình ảnh");
        return;
      }

      // Combine kept images and uploaded files
      const finalData = {
        ...data,
        keptImages: displayImages, // Add kept images
      };

      await mutateAsync(finalData, {
        onSuccess: async () => {
          // Invalidate the places query to refetch the data
          queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEY] });
          if (place) {
            queryClient.invalidateQueries({
              queryKey: [PLACE_DETAIL_QUERY_KEY, place.id],
            });
          }
          onCloseModal(); // Close modal after successfully creating a place
        },
        onError: () => {
          onCloseModal(); // Close modal if there's an error
        },
      });
    };

    // Expose submit handler via ref
    useImperativeHandle(ref, () => ({
      submit: async () => await handleSubmit(onSubmit)(),
    }));

    if (isLoading || !place) {
      return <Loader className="mt-10" />;
    }

    return (
      <form className="space-y-2">
        <Input
          type="number"
          {...register("id", { valueAsNumber: true })}
          hidden
          value={place?.id}
        />
        <Input
          type="text"
          {...register("images")}
          hidden
          value={place?.images.join(";")}
        />
        <Input
          label="Tên địa điểm"
          placeholder="Nhập tên địa điểm"
          value={place?.name}
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Mô tả ngắn"
          placeholder="Nhập mô tả ngắn"
          value={place?.shortDescription}
          {...register("shortDescription")}
          errorMessage={errors.shortDescription?.message}
        />
        <Dropdown
          label="Thành phố"
          options={cities?.data}
          isLoading={isLoadingCities}
          isError={isErrorCities}
          placeHolder="Chọn thành phố"
          name="cityId"
          value={place?.city.id}
          control={control}
        />
        <Dropdown
          label="Thể loại (3)"
          options={categories?.data}
          isLoading={isLoadingCategories}
          isError={isErrorCategories}
          isMulti={true}
          isClearable={true}
          maxSelectItems={3}
          value={place?.categories.map((category) => category.id)}
          name="categoryIds"
          control={control}
        />
        <Input
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          value={place?.address}
          {...register("address")}
          errorMessage={errors.address?.message}
        />
        <Textarea
          label="Mô tả chi tiết"
          placeholder="Nhập mô tả chi tiết"
          value={place?.description}
          {...register("description")}
          errorMessage={errors.description?.message}
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
      </form>
    );
  }
);

export default UpdatePlace;
