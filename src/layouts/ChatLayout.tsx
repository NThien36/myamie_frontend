import Logo from "@/assets/images/Logo";
import Conversations from "@/pages/auth/Chat/components/Conversations";
import { ROUTE_PATH } from "@/routes/route-path";
import { isLoginSelector } from "@/store/auth/auth.selector";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, Navigate, Outlet } from "react-router-dom";

function ChatLayout() {
  const isLoggedIn = useSelector(isLoginSelector);
  if (!isLoggedIn) {
    return <Navigate to={ROUTE_PATH.LOGIN} replace={true} />;
  }

  return (
    <div className="flex">
      <Toaster />
      <div className="rounded-xl w-fit md:w-96 flex-none h-screen overflow-hidden flex flex-col">
        <Link
          to={ROUTE_PATH.BUSINESSES}
          className="hidden sm:block mx-auto mt-3"
        >
          <Logo />
        </Link>
        {/* <div className="hidden md:flex bg-white border border-gray-200 p-1.5 gap-3 rounded-md mx-3 mt-4">
          <input
            placeholder="Nhập tên"
            className="w-full outline-none text-xs pl-2"
          />
          <IconBtn icon="fa-magnifying-glass" />
        </div> */}
        <div className="h-full overflow-y-auto sm:px-3 sm:mt-3 pb-5">
          <Conversations />
          {/* <p className="hidden md:block mt-5 text-center font-medium text-gray-500 text-xs">
            Không còn đoạn chat nào
          </p> */}
        </div>
      </div>
      <div className="border-x-2 w-full h-screen overflow-hidden flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
