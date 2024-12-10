import IconBtn from "../Buttons/IconBtn";
import getImageUrl from "@/utils/getImageUrl";

interface ImagesDisplayProps {
  images?: string[];
  onRemove: (index: number) => void;
}

function ImagesDisplay({ images = [], onRemove }: ImagesDisplayProps) {
  return (
    <div>
      <label className="mb-2 block font-medium">
        Ảnh hiện tại ({images.length})
      </label>
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative w-full h-24">
            <img
              src={getImageUrl(image, "cover")}
              alt={`Displayed preview ${index + 1}`}
              className="object-cover w-full h-full rounded-lg"
            />
            <IconBtn
              effect="opacity"
              icon="fa-xmark"
              onClick={() => onRemove(index)}
              className="absolute top-2 right-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesDisplay;
