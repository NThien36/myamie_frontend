import { noCover } from "@/assets/images";
import Button from "@/components/Buttons/Button";
import { useUpdateCover } from "@/services/account.service";
import { PROFILE_QUERY_KEY } from "@/utils/constants";
import getImageUrl from "@/utils/getImageUrl";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

interface CoverUploadProps {
  image?: string;
}

function CoverUpload({ image }: CoverUploadProps) {
  const [coverImg, setCoverImg] = useState<string>(image || "");
  const [isModified, setIsModified] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();

  const { isPending, mutateAsync } = useUpdateCover();

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
          setCoverImg(e.target.result as string);
          setIsModified(true); // Mark the image as modified
        }
      };
      reader.readAsDataURL(file);
    }

    // Reset the file input value to allow reselecting the same file
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUndo = () => {
    setCoverImg(image || noCover);
    setSelectedFile(null); // Reset the selected file
    setIsModified(false); // Reset modification state
  };

  const handleSave = async () => {
    if (!selectedFile) return;
    await mutateAsync(selectedFile, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
        setCoverImg("");
      },
    });
    setIsModified(false);
  };

  // reset setCoverImg if image changes
  useEffect(() => {
    setCoverImg(image || "");
  }, [image]);

  return (
    <div className="relative">
      <label className="mb-2 block font-medium">Ảnh bìa (1400 x 320px)</label>
      <img
        src={isModified ? coverImg : getImageUrl(coverImg, "cover")}
        alt="cover image"
        className="object-cover h-48 sm:h-64 w-full rounded-lg"
      />
      <div className="absolute bottom-3 right-3 flex gap-2 justify-center flex-wrap">
        <Button
          onClick={handleButtonClick}
          variant="outline"
          className="flex items-center gap-2.5 text-xs"
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
              className="flex items-center gap-2.5 text-xs"
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

export default CoverUpload;
