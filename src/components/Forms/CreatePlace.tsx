import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import Textarea from "../Input/Textarea";
import ImagesUpload from "../ImagesUpload/ImagesUpload";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCategories } from "@/services/category.service";
import { useGetCities } from "@/services/city.service";
import { useCreatePlace } from "@/services/place.service";
import { forwardRef, useEffect, useImperativeHandle } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PLACE_QUERY_KEY } from "@/utils/constants";

interface CreatePlaceProps {
  setIsPending: (value: boolean) => void;
  onCloseModal: () => void;
}

const schema = z.object({
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
    .array(z.instanceof(File), {
      required_error: "Hình ảnh không được để trống",
    })
    .min(1, { message: "Tải lên ít nhất một hình ảnh" })
    .max(10, { message: "Tải lên tối đa 10 hình ảnh" }),
});

type FormCreatePlaceFields = z.infer<typeof schema>;

const CreatePlace = forwardRef(
  ({ setIsPending, onCloseModal }: CreatePlaceProps, ref) => {
    const queryClient = useQueryClient(); // Query client for invalidating queries
    const {
      register,
      handleSubmit,
      formState: { errors },
      control,
    } = useForm<FormCreatePlaceFields>({
      mode: "onBlur",
      resolver: zodResolver(schema),
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

    const { isPending, mutateAsync } = useCreatePlace();

    // Update isPending in the parent component
    useEffect(() => {
      setIsPending(isPending);
    }, [isPending, setIsPending]);

    const onSubmit = async (data: FormCreatePlaceFields) => {
      await mutateAsync(data, {
        onSuccess: () => {
          // Invalidate the places query to refetch the data
          queryClient.invalidateQueries({ queryKey: [PLACE_QUERY_KEY] });
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

    return (
      <form className="space-y-2">
        <Input
          label="Tên địa điểm"
          placeholder="Nhập tên địa điểm"
          {...register("name")}
          errorMessage={errors.name?.message}
        />
        <Input
          label="Mô tả ngắn"
          placeholder="Nhập mô tả ngắn"
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
          name="categoryIds"
          control={control}
        />
        <Input
          label="Địa chỉ"
          placeholder="Nhập địa chỉ"
          {...register("address")}
          errorMessage={errors.address?.message}
        />
        <Textarea
          label="Mô tả chi tiết"
          placeholder="Nhập mô tả chi tiết"
          {...register("description")}
          errorMessage={errors.description?.message}
        />
        <ImagesUpload control={control} name="imageFiles" />
      </form>
    );
  }
);

export default CreatePlace;
