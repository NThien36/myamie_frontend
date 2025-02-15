import { useState } from "react";

interface CarouselProps {
  images: string[];
}

function Carousel({ images }: CarouselProps) {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };

  return (
    <div className="relative w-full h-full">
      {images.map((item, index) => (
        <img
          src={item}
          key={index}
          className={`absolute w-full h-full object-cover rounded-xl transition-opacity duration-700 ${
            slide === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div className="absolute bottom-8 w-full flex items-center justify-center gap-12">
        <button onClick={prevSlide} className="text-white">
          <i className="fa-2xl fa-regular fa-arrow-left-long"></i>
        </button>

        <div className="flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              className={`${
                slide === index ? "bg-white" : "bg-gray-300"
              } h-1 w-10 rounded-full`}
            />
          ))}
        </div>

        <button onClick={nextSlide} className="text-white">
          <i className="fa-2xl fa-regular fa-arrow-right-long"></i>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
