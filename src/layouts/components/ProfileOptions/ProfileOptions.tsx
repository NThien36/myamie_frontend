import Avatar from "@/components/Avatar/Avatar";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";
import { useDispatch } from "react-redux";
import { logout } from "@/store/auth/auth.slice";

interface ProfileOptionsProps {
  src: string;
  name: string;
}

function ProfileOptions({ src, name }: ProfileOptionsProps) {
  const [isShow, setIsShow] = useState(false);
  const dispatch = useDispatch();

  const handleShowOptions = () => {
    setIsShow(!isShow);
  };

  const ref = useClickOutside(() => setIsShow(false));

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
          <button className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full">
            <i className="fa-regular fa-user"></i>
            <p className="">Trang cá nhân</p>
          </button>
          <button className="p-1.5 hover:bg-primary-lighter rounded-sm flex gap-4 items-center w-full">
            <i className="fa-regular fa-gear"></i>
            <p className="">Thông tin</p>
          </button>
          <button
            onClick={() => {
              dispatch(logout());
            }}
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
