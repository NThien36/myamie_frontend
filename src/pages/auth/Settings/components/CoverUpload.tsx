import { noCover } from "@/assets/images";
import Button from "@/components/Buttons/Button";
import { useRef, useState } from "react";

function CoverUpload() {
  const [coverImg, setCoverImg] = useState<string>(noCover);
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
          setCoverImg(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <label className="mb-2 block font-medium">Ảnh bìa (1400 x 320px)</label>
      <img
        src={coverImg}
        alt="cover image"
        className="object-cover h-48 sm:h-64 w-full rounded-lg"
      />
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="flex items-center gap-2.5 text-xs absolute bottom-3 right-3"
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

export default CoverUpload;
