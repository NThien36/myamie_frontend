import Input from "@/components/Input/Input";
import AvatarUpload from "./components/AvatarUpload";
import CoverUpload from "./components/CoverUpload";
import Dropdown from "@/components/Dropdown/Dropdown";
import { cityData } from "@/assets/data/city";
import Textarea from "@/components/Input/Textarea";
import { categoryData } from "@/assets/data/category";
import CharacteristicSelect from "./components/CharacteristicSelect";
import Button from "@/components/Buttons/Button";

const characteristic = ["Học giỏi", "Đẹp trai", "Dễ thương", "Nhanh nhẹn"];

function Settings() {
  return (
    <div className="auth-container">
      <CoverUpload />
      <div className="flex gap-10 mt-7">
        <AvatarUpload />
        <div className="w-full flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-5">
            <Input label="Họ" placeholder="Nhập họ" />
            <Input label="Tên" placeholder="Nhập tên" />
            <Input
              type="date"
              label="Ngày sinh"
              placeholder="Nhập ngày sinh..."
            />
            <Dropdown label="Thành phố" options={cityData} />
          </div>
          <Input label="Mô tả ngắn" placeholder="Nhập mô tả..." />
          <Textarea label="Mô tả" placeholder="Nhập mô tả chi tiết..." />
          <Dropdown
            label="Sở thích (3)"
            options={categoryData}
            isMulti={true}
            isClearable={true}
            maxSelectItems={3}
          />
          <CharacteristicSelect currentCharacteristics={characteristic} />
        </div>
      </div>
      <div className="mt-10 flex justify-end">
        <Button variant="outline" className="text-xs font-medium">
          Lưu thay đổi
        </Button>
      </div>
    </div>
  );
}

export default Settings;
