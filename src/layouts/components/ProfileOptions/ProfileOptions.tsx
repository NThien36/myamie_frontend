import Avatar from "@/components/Avatar/Avatar";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/auth/auth.slice";
import { Link } from "react-router-dom";
import { ROUTE_PATH } from "@/routes/route-path";
import { accountRoleSelector } from "@/store/auth/auth.selector";
import { RoleEnum } from "@/models/app.interface";
import { useQueryClient } from "@tanstack/react-query";

interface ProfileOptionsProps {
  src: string;
  name: string;
  accountId: number;
}

function ProfileOptions({ src, name, accountId }: ProfileOptionsProps) {
  const queryClient = useQueryClient();
  const [isShow, setIsShow] = useState(false);
  const role = useSelector(accountRoleSelector);
  const dispatch = useDispatch();

  const handleShowOptions = () => {
    setIsShow(!isShow);
  };

  const ref = useClickOutside(() => setIsShow(false));

  const handleLogout = () => {
    queryClient.clear();
    dispatch(logout());
  };

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-2">
        <Avatar
          onClick={handleShowOptions}
          src={src}
          alt="avatar"
          size="size-10"
          hasBorder={false}
          className="hover:cursor-pointer"
        />
        <p className="font-medium">{name}</p>
      </div>
      {isShow && (
        <div className="absolute text-nowrap bg-white rounded-md right-0 border-2 shadow-xl p-1 mt-2">
          {role === RoleEnum.ADMIN ? (
            <Link
              to={ROUTE_PATH.ADMIN_USERS}
              className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full"
            >
              <i className="fa-regular fa-user"></i>
              <p className="">Quản trị</p>
            </Link>
          ) : (
            <>
              <Link
                to={`/user/${accountId}`}
                className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full"
              >
                <i className="fa-regular fa-user"></i>
                <p className="">Trang cá nhân</p>
              </Link>
              <Link
                to={ROUTE_PATH.SETTINGS}
                className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full"
              >
                <i className="fa-regular fa-gear"></i>
                <p className="">Thông tin</p>
              </Link>
            </>
          )}
          <button
            onClick={handleLogout}
            className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full"
          >
            <i className="fa-regular fa-arrow-right-from-bracket"></i>
            <p className="">Đăng suất</p>
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileOptions;
