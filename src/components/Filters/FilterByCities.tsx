import { City } from "@/models/city.interface";
import { remove as removeDiacritics } from "diacritics";
import { useState } from "react";
import Input from "../Input/Input";
import IconBtn from "../Buttons/IconBtn";
import useDebounce from "@/hooks/useDebounce";
import Loader from "../Loader/Loader";
import { useCities } from "@/hooks/useCities";

const normalizeString = (str: string) => removeDiacritics(str.toLowerCase());

interface FilterByCitiesProps {
  onCitySelect: (cityId: number) => void;
}

function FilterByCities({ onCitySelect }: FilterByCitiesProps) {
  const { cities, isLoading, isError } = useCities();

  const [term, setTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Debounced search term
  const debouncedTerm = useDebounce(term, 300);

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(e.target.value);
  };

  // handle city select
  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setTerm(city.name);
    onCitySelect(city.id);
  };

  // clear selected city
  const clearSelectedCity = () => {
    setSelectedCity(null);
    setTerm("");
  };

  console.log("cities", cities);

  // filter city data
  const filteredCities = cities?.filter((city) =>
    normalizeString(city.name).includes(normalizeString(debouncedTerm))
  );

  let content;
  if (isLoading) {
    content = <Loader className="mt-2" />;
  } else if (isError) {
    content = <p className="error mt-2">Lỗi, vui lòng thử lại</p>;
  } else {
    content = (
      <ul
        className="text-gray-600 h-40 overflow-y-auto mt-2"
        aria-label="Danh sách thành phố"
        role="listbox"
      >
        {filteredCities?.map((city: City) => (
          <li
            key={city.id}
            onClick={() => handleCitySelect(city)}
            className="py-1.5 pl-3 mr-2 hover:bg-primary-lighter rounded-md cursor-pointer"
            role="option"
          >
            {city.name}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <div className="relative">
        <Input
          placeholder="Chọn thành phố"
          label="Thành phố"
          value={term}
          onChange={handleInputChange}
          readonly={!!selectedCity}
        />
        {selectedCity && (
          <IconBtn
            hasBackground={false}
            className="absolute right-3 bottom-2"
            onClick={clearSelectedCity}
            icon="fa-circle-xmark"
          />
        )}
      </div>
      {!selectedCity && content}
    </div>
  );
}

export default FilterByCities;
