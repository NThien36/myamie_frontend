function Cover({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full object-cover rounded-b-2xl h-80"
    />
  );
}

export default Cover;
