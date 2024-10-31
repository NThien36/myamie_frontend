import Logo from "@/assets/images/Logo";
import IconBtn from "@/components/Buttons/IconBtn";
import Conversations from "@/pages/auth/Chat/components/Conversations";
import { ROUTE_PATH } from "@/routes/route-path";
import { Link, Outlet } from "react-router-dom";

function ChatLayout() {
  const token = "dddddddddd";

  return (
    <div className="flex">
      <div className="rounded-xl w-96 flex-none h-screen overflow-hidden flex flex-col">
        <Link to={ROUTE_PATH.BUSINESSES} className="mx-auto mt-3">
          <Logo />
        </Link>
        <div className="bg-white border border-gray-200 p-1.5 flex gap-3 rounded-md mx-3 mt-4">
          <input
            placeholder="Nhập tên"
            className="w-full outline-none text-xs pl-2"
          />
          <IconBtn icon="fa-magnifying-glass" />
        </div>
        <div className="h-full overflow-y-auto px-3 mt-3 pb-5">
          <Conversations />
          <p className="mt-5 text-center font-medium text-gray-500 text-xs">
            Không còn đoạn chat nào
          </p>
        </div>
      </div>
      <div className="border-x-2 w-full h-screen overflow-hidden flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default ChatLayout;
