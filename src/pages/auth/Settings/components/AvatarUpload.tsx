import { noAvatar } from "@/assets/images";
import Button from "@/components/Buttons/Button";
import { useRef, useState } from "react";

function AvatarUpload() {
  const [src, setSrc] = useState<string>(noAvatar);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSrc(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex-none mx-auto md:mx-0">
      <label className="mb-2 block font-medium text-center">Ảnh đại diện</label>
      <img
        src={src}
        alt="avatar image"
        className="object-cover size-40 rounded-full"
      />
      <Button
        variant="outline"
        className="flex items-center gap-2.5 text-xs mt-3 mx-auto"
        onClick={handleButtonClick}
      >
        <i className="fa-solid fa-arrow-up-from-bracket"></i>
        <p className="font-semibold">Tải ảnh lên</p>
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default AvatarUpload;
