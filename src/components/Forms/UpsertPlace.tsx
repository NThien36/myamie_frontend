import Input from "../Input/Input";
import Dropdown from "../Dropdown/Dropdown";
import { cityData } from "@/assets/data/city";
import { categoryData } from "@/assets/data/category";
import Textarea from "../Input/Textarea";
import ImagesUpload from "../ImagesUpload/ImagesUpload";

function UpsertPlace() {
  return (
    <>
      <Input label="Tên địa điểm" placeholder="Nhập tên địa điểm" />
      <Input label="Mô tả ngắn" placeholder="Nhập mô tả ngắn" />
      <Dropdown label="Loại địa điểm" options={cityData} />
      <Dropdown
        label="Thể loại (3)"
        options={categoryData}
        isMulti={true}
        isClearable={true}
        maxSelectItems={3}
      />
      <Input label="Địa chỉ" placeholder="Nhập địa chỉ" />
      <Textarea label="Mô tả chi tiết" placeholder="Nhập mô tả chi tiết" />
      <ImagesUpload />
    </>
  );
}

export default UpsertPlace;
