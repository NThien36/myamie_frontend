import { useEffect, useRef } from "react";
import IconBtn from "../Buttons/IconBtn";
import Button from "../Buttons/Button";
import { useController } from "react-hook-form";

interface ImagesUploadProps {
  control: any;
  name: string;
  limit?: number;
}

function ImagesUpload({ control, name, limit = 10 }: ImagesUploadProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue: [],
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const previewUrls = useRef<string[]>([]); // Store preview URLs

  // Clean up all URLs when the component unmounts
  useEffect(() => {
    return () => {
      previewUrls.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).slice(0, limit - value.length);

      // Generate preview URLs and track them separately (but don't add them to the onChange value)
      newFiles.forEach((file) => {
        const url = URL.createObjectURL(file);
        previewUrls.current.push(url); // Keep track of URLs for cleanup
      });

      onChange([...value, ...newFiles]); // Add the new files to the value
    }

    // Reset the file input value to allow reselecting the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    // Remove the image from the list
    onChange(
      value.filter((_: any, imageIndex: number) => imageIndex !== index)
    );
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <label className="mb-2 block font-medium">
        Hình ảnh ({value.length}/{limit})
      </label>
      <div className="grid grid-cols-4 gap-3">
        {value.map((image: File, index: number) => (
          <div key={index} className="relative w-full h-24">
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded preview ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <IconBtn
              effect="opacity"
              icon="fa-xmark"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-2 right-2"
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-3">
        <Button
          variant="outline"
          onClick={handleUploadClick}
          disabled={value.length >= limit}
          className="text-xs font-medium"
        >
          Tải ảnh lên
        </Button>
        {value.length >= limit && (
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
        disabled={value.length >= limit} // Disable if max images reached
      />
      {error && (
        <p className="text-xs text-red-500 mt-1.5 inline-block">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default ImagesUpload;
