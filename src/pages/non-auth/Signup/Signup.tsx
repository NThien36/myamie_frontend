import Button from "@/components/Buttons/Button";
import Input from "@/components/Input/Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignup } from "@/services/auth.service";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email không được để trống" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(1, { message: "Mật khẩu không được để trống" })
    .min(6, { message: "Mật khẩu phải dài hơn 6 ký tự" }),
  firstname: z
    .string()
    .min(1, { message: "Tên không được để trống" })
    .max(50, { message: "Tên không được dài quá 50 ký tự" }),
  lastname: z
    .string()
    .min(1, { message: "Họ không được để trống" })
    .max(50, { message: "Họ không được dài quá 50 ký tự" }),
});

export type FormSignupFields = z.infer<typeof schema>;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSignupFields>({
    mode: "onBlur",
    resolver: zodResolver(schema),
  });

  const { isPending, mutateAsync } = useSignup();
  const navigate = useNavigate(); // If using react-router for navigation

  const onSubmit = async (data: FormSignupFields) => {
    // Try to get the user's location, but make it optional
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const payload = {
          email: data.email,
          password: data.password,
          firstName: data.firstname,
          lastName: data.lastname,
          latitude, // Only included if location is available
          longitude, // Only included if location is available
        };

        await mutateAsync(payload);
        navigate("/login");
      },
      async () => {
        // Location is not available, proceed without it
        const payload = {
          email: data.email,
          password: data.password,
          firstName: data.firstname,
          lastName: data.lastname,
          // No latitude and longitude added if location retrieval fails
        };

        await mutateAsync(payload);
        navigate("/login");
      },
      { enableHighAccuracy: false, maximumAge: 0 } // Optional geolocation settings
    );
  };

  return (
    <>
      <p className="text-lg font-semibold">Đăng ký</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-3 space-y-3">
        <div className="flex gap-3">
          <Input
            id="signup-lastname"
            label="Họ"
            placeholder="Nhập họ..."
            {...register("lastname")}
            errorMessage={errors.lastname?.message}
          />
          <Input
            id="signup-firstname"
            label="Tên"
            placeholder="Nhập tên..."
            {...register("firstname")}
            errorMessage={errors.firstname?.message}
          />
        </div>
        <Input
          id="signup-email"
          label="Email"
          type="email"
          placeholder="Nhập tài khoản Email..."
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Input
          id="signup-password"
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu..."
          {...register("password")}
          errorMessage={errors.password?.message}
        />
        <Button
          id="signup-button"
          type="submit"
          variant="outline"
          shape="rounded"
          className="w-full"
        >
          {isPending ? "Đang đăng ký..." : "Đăng ký"}
        </Button>
      </form>
    </>
  );
}

export default Signup;
