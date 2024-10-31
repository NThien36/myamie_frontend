import { useRef, useState } from "react";
import IconBtn from "../Buttons/IconBtn";
import Button from "../Buttons/Button";

function ImagesUpload() {
  const [images, setImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, 10 - images.length); // Limit to max 10 images
      setImages((prevImages) => [...prevImages, ...newFiles]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) =>
      prevImages.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="mb-2 block font-medium">Hình ảnh (tối đa 10)</label>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-24">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded preview ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <IconBtn
              icon="fa-circle-xmark"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2 text-red-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        <Button
          variant="outline"
          onClick={handleUploadClick}
          disabled={images.length >= 10}
          className="text-xs font-medium"
        >
          Tải ảnh lên
        </Button>
        {images.length >= 10 && (
          <p className="text-red-600 mt-2">Đã đạt tối đa 10 hình ảnh.</p>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleImageChange}
        disabled={images.length >= 10} // Disable if max images reached
      />
    </div>
  );
}

export default ImagesUpload;
