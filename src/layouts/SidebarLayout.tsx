import { ROUTE_PATH } from "@/routes/route-path";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import { RoleEnum } from "@/models/app.interface";

const ROUTE_LABEL_MAP: Record<string, string> = {
  [ROUTE_PATH.SETTINGS]: "Thông tin cá nhân",
  [ROUTE_PATH.ACCOUNT]: "Tài khoản & Mật khẩu",
  [ROUTE_PATH.ADMIN_USERS]: "Quản lý người dùng",
  [ROUTE_PATH.ADMIN_LOCATIONS]: "Quản lý địa điểm",
  [ROUTE_PATH.BUSINESS_OVERVIEW]: "Tổng quan",
  [ROUTE_PATH.BUSINESS_FEEDBACK]: "Đánh giá",
};

function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const role = RoleEnum.USER;

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/");
    };
  }, [navigate]);

  const currentLabel = ROUTE_LABEL_MAP[location.pathname] || "";

  return (
    <>
      <NavBar />
      <div className="container px-14 min-h-screen">
        <div className="grid grid-cols-5 mt-10 mb-32">
          <div className="col-span-1 mr-14">
            {role && <Sidebar role={role} />}
          </div>
          <div className="col-span-4">
            <p className="text-base font-semibold mb-3">{currentLabel}</p>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default SidebarLayout;
