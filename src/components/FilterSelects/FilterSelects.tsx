import cx from "classnames";
import { useState } from "react";

interface FilterSelectsProps {
  label: string;
  options: string[];
}

function FilterSelects({ label, options }: FilterSelectsProps) {
  const [selected, setSelected] = useState<string>(options[0]);

  return (
    <div className="flex gap-4 text-xs items-center">
      <p className="font-medium">{label}:</p>
      <div className="flex flex-wrap gap-3">
        {options.map((option, index) => (
          <button
            key={index}
            className={cx("px-2 py-1 border-2 rounded-full", {
              "border-primary": selected === option,
            })}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterSelects;
