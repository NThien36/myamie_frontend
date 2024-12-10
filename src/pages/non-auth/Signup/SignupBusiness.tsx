import Divider from "@/components/Divider/Divider";
import Dropdown from "@/components/Dropdown/Dropdown";
import IconText from "@/components/IconText/IconText";
import Input from "@/components/Input/Input";
import ConfirmEmail from "./components/ConfirmEmail";
import { useState } from "react";
import Button from "@/components/Buttons/Button";
import { useGetCities } from "@/services/city.service";
import { useGetCategories } from "@/services/category.service";

function SignupBusiness() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    data: cities,
    isLoading: isLoadingCities,
    isError: isErrorCities,
  } = useGetCities();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useGetCategories();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="mx-auto flex flex-col items-center py-10 sm:py-0">
      <p className="text-xl font-medium text-center">
        Đăng ký cho người làm dịch vụ
      </p>
      <p className="mt-1 text-gray-600 text-center">
        Gia nhập cộng đồng MYAmie giúp nghiệp tiếp cận dễ dàng hơn đến các khách
        hàng tiềm năng
      </p>
      <div className="flex flex-wrap sm:flex-nowrap gap-7 mt-10 sm-14 w-full">
        <div className="w-full">
          <IconText
            className="w-fit mx-auto"
            icon="fa-shield-keyhole"
            text="Thông tin tài khoản"
            textClasses="font-medium"
          />
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label="Email"
              placeholder="Nhập email của bạn"
              type="email"
            />
            <Input
              label="Mật khẩu"
              placeholder="Nhập mật khẩu của bạn"
              type="password"
            />
            <Input
              label="Nhập lại mật khẩu"
              placeholder="Nhập lại mật khẩu của bạn"
              type="password"
            />
          </div>
        </div>
        <Divider className="hidden sm:block" />
        <div className="w-full mt-5 sm:mt-0">
          <IconText
            className="w-fit mx-auto"
            icon="fa-paper-plane"
            text="Miêu tả dịch vụ"
            textClasses="font-medium"
          />
          <div className="mt-5 flex flex-col gap-4">
            <Input
              label="Tên dịch vụ"
              type="text"
              placeholder="Nhập tên dịch vụ..."
            />
            <Dropdown
              label="Thành phố"
              options={cities?.data}
              isLoading={isLoadingCities}
              isError={isErrorCities}
              placeHolder="Chọn thành phố"
            />
            <Dropdown
              label="Thể loại (3)"
              options={categories?.data}
              isMulti={true}
              isClearable={true}
              maxSelectItems={3}
              isLoading={isLoadingCategories}
              isError={isErrorCategories}
              placeHolder="Chọn thể loại"
            />
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        shape="rounded"
        className="w-full sm:w-1/3 mt-8"
      >
        Đăng ký ngay
      </Button>
      <p className="text-red-500 mt-3 text-xs font-medium text-center">
        (*) Sau khi đăng ký vui lòng cập nhật đầy đủ thông tin tại mục hồ sơ
      </p>
      <ConfirmEmail
        isOpen={isOpen}
        closeModal={closeModal}
        email="minhbee203@gmail.com"
      />
    </div>
  );
}

export default SignupBusiness;
