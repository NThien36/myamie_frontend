import { ChangeEvent, useState } from "react";

interface FilterByDistanceProps {
  onChange: (distance: number) => void;
}

function FilterByDistance({ onChange }: FilterByDistanceProps) {
  const [distance, setDistance] = useState<number>(5);

  const handleDistanceChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newDistance = Number(event.target.value);
    setDistance(newDistance);
    onChange(newDistance);
  };

  return (
    <div className="w-full">
      <p className="font-medium mb-2">Khoảng cách</p>
      <input
        type="range"
        value={distance}
        onChange={handleDistanceChange}
        step={5}
        min="5"
        max="15"
        className="slider appearance-none bg-gray-200 w-full h-2 cursor-pointer"
      />
      <div className="flex justify-between mt-2">
        <p>5km</p>
        <p>10km</p>
        <p>15km</p>
      </div>
    </div>
  );
}

export default FilterByDistance;
