import { ROUTE_PATH } from "@/routes/route-path";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import {
  accountRoleSelector,
  isLoginSelector,
} from "@/store/auth/auth.selector";
import { Toaster } from "react-hot-toast";

const ROUTE_LABEL_MAP: Record<string, string> = {
  [ROUTE_PATH.SETTINGS]: "Thông tin cá nhân",
  [ROUTE_PATH.ACCOUNT]: "Tài khoản & Mật khẩu",
  [ROUTE_PATH.ADMIN_USERS]: "Quản lý người dùng",
  [ROUTE_PATH.ADMIN_PLACES]: "Quản lý địa điểm",
  [ROUTE_PATH.BUSINESS_OVERVIEW]: "Tổng quan",
  [ROUTE_PATH.BUSINESS_FEEDBACK]: "Đánh giá",
};

function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector(isLoginSelector);
  const role = useSelector(accountRoleSelector);

  useEffect(() => {
    const handlePopState = () => {
      navigate("/");
    };

    window.onpopstate = handlePopState;

    return () => {
      window.onpopstate = null; // Cleanup the event listener
    };
  }, [navigate]);

  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace={true} />;
  }

  const currentLabel = ROUTE_LABEL_MAP[location.pathname] || "";

  return (
    <>
      <Toaster />
      <NavBar />
      <div className="container px-3 md:px-14 min-h-screen">
        <div className="grid grid-cols-1 xl:grid-cols-5 mt-10 mb-32">
          <div className="col-span-1 xl:mr-14">
            {role && <Sidebar role={role} />}
          </div>
          <div className="col-span-4 mt-8 xl:mt-0">
            <p className="text-base font-semibold mb-3">{currentLabel}</p>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarLayout;
