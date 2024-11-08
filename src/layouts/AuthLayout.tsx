import Logo from "@/assets/images/Logo";
import cx from "classnames";
import Carousel from "@/components/Carousel/Carousel";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { isLoginSelector } from "@/store/auth/auth.selector";

const images = [
  "https://statics.vinwonders.com/canh-dep-viet-nam-15_1634999578.jpg",
  "https://pantravel.vn/wp-content/uploads/2023/11/ngon-nui-thieng-cua-nhat-ban.jpg",
  "https://nemthuanviet.com/wp-content/uploads/2023/10/canh-dep-1.jpg",
];

function AuthLayout() {
  const location = useLocation();
  const isLoggedIn = useSelector(isLoginSelector);
  if (isLoggedIn) {
    return <Navigate to={ROUTE_PATH.BUSINESSES} replace={true} />;
  }

  const isLoginPage = location.pathname === ROUTE_PATH.LOGIN;
  const isSignupBusinessPage = location.pathname === ROUTE_PATH.SIGNUP_BUSINESS;

  return (
    <div
      className={cx("h-screen", {
        "grid grid-cols-1 md:grid-cols-3": !isSignupBusinessPage,
      })}
    >
      <Toaster />
      <div className="col-span-1 flex flex-col justify-between p-4 h-full">
        <Link to={ROUTE_PATH.BUSINESSES} className="mx-auto">
          <Logo />
        </Link>
        <div
          className={cx("w-full md:w-full lg:w-3/4 mx-auto", {
            "": isSignupBusinessPage,
            "sm:w-1/2": !isSignupBusinessPage,
          })}
        >
          <Outlet />
        </div>
        {isLoginPage ? (
          <div className="flex justify-center gap-1">
            <p>Chưa có tài khoản?</p>
            <Link
              to={ROUTE_PATH.SIGNUP}
              className="hover:underline font-medium"
            >
              Đăng ký tại đây
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-1">
            <p>Đã có tài khoản?</p>
            <Link to={ROUTE_PATH.LOGIN} className="hover:underline font-medium">
              Đăng nhập tại đây
            </Link>
          </div>
        )}
      </div>
      {!isSignupBusinessPage && (
        <div className="hidden md:block col-span-2 py-4 pr-4">
          <Carousel images={images} />
        </div>
      )}
    </div>
  );
}

export default AuthLayout;
