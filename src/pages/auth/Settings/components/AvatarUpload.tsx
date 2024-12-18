import { noAvatar } from "@/assets/images";
import Button from "@/components/Buttons/Button";
import { useUpdateAvatar } from "@/services/account.service";
import getImageUrl from "@/utils/getImageUrl";
import { useRef, useState } from "react";

interface AvatarUploadProps {
  image?: string;
}

function AvatarUpload({ image }: AvatarUploadProps) {
  const [src, setSrc] = useState<string>(image || "");
  const [isModified, setIsModified] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { isPending, mutateAsync } = useUpdateAvatar();

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file); // Save the file for later upload
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSrc(e.target.result as string);
          setIsModified(true); // Mark the image as modified
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset the file input value to allow reselecting the same file
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUndo = () => {
    setSrc(image || noAvatar);
    setSelectedFile(null); // Reset the selected file
    setIsModified(false); // Reset modification state
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    await mutateAsync(selectedFile);
    setIsModified(false);
  };

  return (
    <div className="flex-none mx-auto md:mx-0">
      <label className="mb-2 block font-medium text-center">Ảnh đại diện</label>
      <img
        src={getImageUrl(src, "avatar")}
        alt="avatar image"
        className="object-cover size-40 rounded-full"
      />
      <div className="flex flex-col gap-2 text-xs mx-auto mt-3">
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2.5"
          onClick={handleButtonClick}
        >
          <i className="fa-solid fa-arrow-up-from-bracket"></i>
          <p className="font-semibold">Tải ảnh lên</p>
        </Button>
        {isModified && (
          <>
            <Button
              disabled={isPending}
              onClick={handleUndo}
              variant="outline"
              className="flex items-center justify-center gap-2.5 text-xs"
            >
              <i className="fa-solid fa-arrow-rotate-left"></i>
              <p className="font-semibold">Hoàn tác</p>
            </Button>
            <Button
              disabled={isPending}
              onClick={handleSave}
              variant="outline"
              className="text-xs font-semibold"
            >
              {isPending ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </>
        )}
      </div>
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
