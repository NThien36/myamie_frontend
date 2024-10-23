import { City } from "@/models/city.interface";
import { remove as removeDiacritics } from "diacritics";
import { useState } from "react";
import Input from "../Input/Input";
import IconBtn from "../Buttons/IconBtn";
import { cityData } from "@/assets/data/city";
import useDebounce from "@/hooks/useDebounce";

const normalizeString = (str: string) => removeDiacritics(str.toLowerCase());

interface FilterByCitiesProps {
  onCitySelect: (cityId: number) => void;
}

function FilterByCities({ onCitySelect }: FilterByCitiesProps) {
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

  // filter city data
  const filteredCities = cityData.filter((city) =>
    normalizeString(city.name).includes(normalizeString(debouncedTerm))
  );

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
      {!selectedCity && (
        <ul
          className="text-gray-600 h-40 overflow-y-auto mt-2"
          aria-label="Danh sách thành phố"
          role="listbox"
        >
          {filteredCities.map((city) => (
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
      )}
    </div>
  );
}

export default FilterByCities;
