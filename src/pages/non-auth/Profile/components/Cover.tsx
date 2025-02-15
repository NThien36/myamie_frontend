import getImageUrl from "@/utils/getImageUrl";

function Cover({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={getImageUrl(src, "cover")}
      alt={alt}
      className="w-full object-cover rounded-b-2xl h-64 md:h-80"
    />
  );
}

export default Cover;
