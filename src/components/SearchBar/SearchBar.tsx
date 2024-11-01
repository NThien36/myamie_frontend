import FilterBtn from "../Buttons/FilterBtn";

interface SearchBarProps {
  children: React.ReactNode;
  onSearch: (searchTerm: string) => void;
}

function SearchBar({ children }: SearchBarProps) {
  return (
    <div className="border border-gray-500 rounded-md p-2.5 flex items-center gap-2 md:w-1/2 bg-white mx-auto mt-8">
      <button>
        <i className="px-2 fa-xl fa-regular fa-magnifying-glass"></i>
      </button>
      <input
        type="text"
        placeholder="Nhập từ khoá tìm kiếm tại đây"
        className="w-full outline-none"
      />
      <FilterBtn>{children}</FilterBtn>
    </div>
  );
}

export default SearchBar;
