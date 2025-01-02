import LoginForm from "./components/LoginForm";
import ForgetPassword from "./components/ForgetPassword";
import VerifyEmail from "./components/VerifyEmail";

function Login() {
  return (
    <>
      <p className="text-lg font-semibold">Đăng nhập</p>
      {/* <LoginByFacebook />
      <div className="flex items-center gap-3 mt-5">
        <Divider orientation="horizontal" />
        <p className="flex-none text-xs text-gray-500">
          Hoặc đăng nhập bằng Email
        </p>
        <Divider orientation="horizontal" />
      </div> */}
      <LoginForm />
      <div className="flex flex-wrap justify-center gap-4 mt-3">
        <ForgetPassword />
        <VerifyEmail />
      </div>
    </>
  );
}

export default Login;
