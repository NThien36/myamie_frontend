import cx from "classnames";
import { useState } from "react";

interface FilterSelectsProps {
  label: string;
  options: string[];
  onFilterChange: (selectedValue: string) => void;
}

function FilterSelects({ label, options, onFilterChange }: FilterSelectsProps) {
  const [selected, setSelected] = useState<string>(options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onFilterChange(option); // Notify parent
  };

  return (
    <div className="flex gap-4 text-xs items-center">
      <p className="font-medium flex-none">{label}:</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={cx("px-2 py-1 border-2 rounded-full", {
              "border-primary": selected === option,
            })}
            onClick={() => handleSelect(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSelects;
