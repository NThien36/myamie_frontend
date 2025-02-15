import { useState } from "react";
import FilterBtn from "../Buttons/FilterBtn";

interface SearchBarProps {
  children: React.ReactNode;
  onSearch: (searchTerm: string) => void;
  onActiveClick?: () => void;
  onInactiveClick?: () => void;
}

function SearchBar({
  onSearch,
  children,
  onInactiveClick,
  onActiveClick,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <div className="border border-gray-500 rounded-md p-2.5 flex items-center gap-2 md:w-1/2 bg-white mx-auto mt-8">
      <button onClick={handleSearchClick}>
        <i className="px-2 fa-xl fa-regular fa-magnifying-glass"></i>
      </button>
      <input
        type="text"
        placeholder="Nhập từ khoá tìm kiếm tại đây"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full outline-none"
      />
      <FilterBtn
        onActiveClick={onActiveClick}
        onInactiveClick={onInactiveClick}
      >
        {children}
      </FilterBtn>
    </div>
  );
}

export default SearchBar;
