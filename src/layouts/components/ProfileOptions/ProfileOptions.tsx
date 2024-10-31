import { noAvatar } from "@/assets/images";
import Avatar from "@/components/Avatar/Avatar";
import { useState } from "react";
import useClickOutside from "@/hooks/useClickOutside";

function ProfileOptions() {
  const [isShow, setIsShow] = useState(false);

  const handleShowOptions = () => {
    setIsShow(!isShow);
  };

  const ref = useClickOutside(() => setIsShow(false));

  return (
    <div className="relative" ref={ref}>
      <Avatar
        onClick={handleShowOptions}
        src={noAvatar}
        alt="avatar"
        size="size-10"
        hasBorder={false}
        className="hover:cursor-pointer"
      />
      {isShow && (
        <div className="absolute text-nowrap bg-white rounded-md right-0 border-2 shadow-xl p-1 mt-2">
          <div className="p-1.5 hover:bg-primary-lighter rounded-sm flex items-center">
            <i className="w-7 fa-regular fa-user"></i>
            <p className="">Trang cá nhân</p>
          </div>
          <div className="p-1.5 hover:bg-primary-lighter rounded-sm flex items-center">
            <i className="w-7 fa-regular fa-user-pen"></i>
            <p className="">Thông tin</p>
          </div>
          <div className="p-1.5 hover:bg-primary-lighter rounded-sm flex items-center">
            <i className="w-7 fa-regular fa-arrow-right-from-bracket"></i>
            <p className="">Đăng suất</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileOptions;
