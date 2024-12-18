import AvatarUpload from "./components/AvatarUpload";
import CoverUpload from "./components/CoverUpload";
import DetailProfileForm from "./components/DetailProfileForm";
import { useGetProfile } from "@/services/account.service";
import Loader from "@/components/Loader/Loader";
import { useSelector } from "react-redux";
import { accountRoleSelector } from "@/store/auth/auth.selector";
import { RoleEnum } from "@/models/app.interface";
import DetailProfileFormBusiness from "./components/DetailProfileFormBusiness";

function Settings() {
  const { data, isLoading, isError } = useGetProfile();
  const role = useSelector(accountRoleSelector);
  const profile = data?.data;

  if (isLoading) {
    return <Loader className="mt-10 mx-auto" />;
  } else if (isError) {
    return <p className="error mt-10">Lỗi, vui lòng thử lại</p>;
  }

  if (!profile) {
    return <p className="error mt-10">Không tìm thấy thông tin tài khoản</p>;
  }

  return (
    <div className="auth-container">
      <CoverUpload image={profile.cover} />
      <div className="flex flex-wrap md:flex-nowrap gap-10 mt-7">
        <AvatarUpload image={profile.avatar} />
        {role === RoleEnum.BUSINESS ? (
          <DetailProfileFormBusiness detail={profile} />
        ) : (
          <DetailProfileForm detail={profile} />
        )}
      </div>
    </div>
  );
}

export default Settings;
