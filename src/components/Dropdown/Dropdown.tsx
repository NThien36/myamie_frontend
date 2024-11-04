// import DropdownList from "react-dropdown";
import Select from "react-select";
import { useState } from "react";

interface DropdownProps<T> {
  label?: string;
  options?: T[];
  isClearable?: boolean;
  isMulti?: boolean;
  maxSelectItems?: number;
  placeHolder?: string;
  className?: string;
  height?: string;
  isLoading?: boolean;
  isError?: boolean;
}

const defaultHeight = "2.95rem";

const styles = (height: string) => ({
  control: (base: any) => ({
    ...base,
    height: height || defaultHeight,
    borderColor: "#E5E7EB",
    borderRadius: "0.375rem",
    boxShadow: "none",
    ":hover": { cursor: "pointer", borderColor: "#d1d5db" },
  }),
  menu: (base: any) => ({
    ...base,
    paddingLeft: "0.25rem",
    marginTop: "0.3rem",
    backgroundColor: "white",
    borderRadius: "0.375rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  }),
  option: (base: any, state: { isFocused: boolean }) => ({
    ...base,
    padding: "0.5rem",
    borderRadius: "0.375rem",
    backgroundColor: state.isFocused ? "#EBF4FB" : "white",
    color: "#4b5563",
    cursor: "pointer",
    ":active": {
      backgroundColor: "#D5E9F9",
    },
  }),
  multiValue: (base: any) => ({
    ...base,
    marginRight: "0.25rem",
    paddingLeft: "0.2rem",
    backgroundColor: "#EBF4FB", // Background color for selected items in multi-select
    borderRadius: "0.375rem",
  }),
  multiValueLabel: (base: any) => ({
    ...base,
    color: "#3F6189", // Text color for selected items
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    borderRadius: "0.375rem",
    color: "#2c5282", // Text color for the remove button
    ":hover": {
      backgroundColor: "#e2e8f0", // Light gray on hover
      color: "#2c5282", // Maintain text color
    },
  }),
});

function Dropdown<T extends { name: string; id: number }>({
  label,
  options = [],
  isClearable = false,
  isMulti = false,
  maxSelectItems = 1,
  placeHolder = "Chọn một hoặc nhiều mục",
  className = "w-full",
  height = defaultHeight,
  isLoading = false,
  isError = false,
}: DropdownProps<T>) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const selectOptions: { label: string; value: number }[] = options.map(
    (option) => ({
      label: option.name,
      value: option.id,
    })
  );
  const handleChange = (selected: any) => {
    setSelectedOptions(isMulti ? selected : selected ? [selected] : []);
  };

  const currentPlaceholder = isLoading
    ? "Đang tải..."
    : isError
    ? "Lỗi khi tải dữ liệu"
    : placeHolder;

  return (
    <div className={className}>
      {label && <label className="mb-2 block font-medium">{label}</label>}
      <Select
        options={selectOptions}
        placeholder={currentPlaceholder}
        styles={styles(height)}
        isClearable={isClearable}
        isMulti={isMulti}
        maxMenuHeight={240}
        minMenuHeight={50}
        onChange={handleChange}
        menuPortalTarget={document.body}
        isDisabled={isLoading || isError} // Disable if loading or error
        isOptionDisabled={() =>
          isMulti && maxSelectItems
            ? selectedOptions.length >= maxSelectItems
            : false
        }
      />
    </div>
  );
}

export default Dropdown;
