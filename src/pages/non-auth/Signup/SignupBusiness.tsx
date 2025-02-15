import Divider from "@/components/Divider/Divider";
import Dropdown from "@/components/Dropdown/Dropdown";
import IconText from "@/components/IconText/IconText";
import Input from "@/components/Input/Input";
import Button from "@/components/Buttons/Button";
import { useGetCities } from "@/services/city.service";
import { useGetCategories } from "@/services/category.service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSignupBusiness } from "@/services/auth.service";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu không được để trống" })
    .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
  shortDescription: z
    .string()
    .min(1, { message: "Mô tả không được để trống" })
    .max(250, { message: "Mô tả ngắn không được dài quá 250 ký tự" }),
  name: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài quá 50 ký tự" }),
  cityId: z
    .number({ required_error: "Thành phố không được để trống" })
    .min(1, { message: "Vui lòng chọn một thành phố" }),
  categoryIds: z
    .array(z.number(), { required_error: "Thể loại không được để trống" })
    .min(1, { message: "Chọn ít nhất một thể loại" })
    .max(3, { message: "Chọn tối đa 3 thể loại" }),
});

export type FormSignupBusinessFields = z.infer<typeof schema>;

function SignupBusiness() {
  // const [submittedEmail, setSubmittedEmail] = useState<string>("");
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormSignupBusinessFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const {
    data: cities,
    isLoading: isLoadingCities,
    isError: isErrorCities,
  } = useGetCities();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategories();

  const { isPending, mutateAsync } = useSignupBusiness();
  const navigate = useNavigate();

  const onSubmit = async (data: FormSignupBusinessFields) => {
    // setSubmittedEmail(data.email);
    await mutateAsync(data, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex flex-col items-center py-10 sm:py-0"
    >
      <p className="text-xl font-medium text-center">
        Đăng ký cho người làm dịch vụ
      </p>
      <p className="mt-1 text-gray-600 text-center">
        Gia nhập cộng đồng MYAmie giúp nghiệp tiếp cận dễ dàng hơn đến các khách
        hàng tiềm năng
      </p>
      <div className="flex flex-wrap sm:flex-nowrap gap-7 mt-10 sm-14 w-full">
        <div className="w-full">
          <IconText
            className="w-fit mx-auto"
            icon="fa-shield-keyhole"
            text="Thông tin tài khoản"
            textClasses="font-medium"
          />
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label="Email"
              placeholder="Nhập email của bạn"
              type="email"
              {...register("email")}
              errorMessage={errors.email?.message}
            />
            <Input
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              type="password"
              {...register("password")}
              errorMessage={errors.password?.message}
            />
            <Input
              label="Nhập mô tả ngắn dịch vụ"
              placeholder="Nhập lại mô tả ngắn của bạn"
              type="text"
              {...register("shortDescription")}
              errorMessage={errors.shortDescription?.message}
            />
          </div>
        </div>
        <Divider className="hidden sm:block" />
        <div className="w-full mt-5 sm:mt-0">
          <IconText
            className="w-fit mx-auto"
            icon="fa-paper-plane"
            text="Miêu tả dịch vụ"
            textClasses="font-medium"
          />
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label="Tên dịch vụ"
              type="text"
              placeholder="Nhập tên dịch vụ..."
              {...register("name")}
              errorMessage={errors.name?.message}
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
              isMulti={true}
              isClearable={true}
              maxSelectItems={3}
              isLoading={isLoadingCategories}
              isError={isErrorCategories}
              placeHolder="Chọn thể loại"
              name="categoryIds"
              control={control}
            />
          </div>
        </div>
      </div>
      <Button
        disabled={isPending}
        type="submit"
        variant="outline"
        shape="rounded"
        className="w-full sm:w-1/3 mt-8 mx-auto"
      >
        {isPending ? "Đang xử lý..." : "Đăng ký"}
      </Button>
      <p className="text-red-500 mt-3 text-xs font-medium text-center">
        (*) Sau khi đăng ký vui lòng cập nhật đầy đủ thông tin tại mục hồ sơ
      </p>
    </form>
  );
}

export default SignupBusiness;
