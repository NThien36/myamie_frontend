import CategoryItem from "./CategoryItem";
import { useGetCategories } from "@/services/category.service";
import Loader from "../Loader/Loader";
import { useState } from "react";

interface CategoryContainerProps {
  onSelect: (categoryId: number) => void;
}

function CategoryContainer({ onSelect }: CategoryContainerProps) {
  const { data, isLoading, isError } = useGetCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    0
  );

  let content;

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId); // Set the selected category when clicked
    onSelect(categoryId); // Call the parent's onSelect function
  };

  const handleClearCategory = () => {
    setSelectedCategoryId(0);
    onSelect(0); // Call the parent's onSelect function with null
  };

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại</p>;
  } else {
    content = data?.data?.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        onClick={() => handleCategoryClick(category.id)}
        isActive={category.id === selectedCategoryId}
      />
    ));
  }

  return (
    <div className="flex justify-center gap-3 mt-7 flex-wrap md:w-4/5 mx-auto">
      <CategoryItem
        category={{ id: 0, name: "Tất cả", icon: "fa-icons" }}
        isActive={selectedCategoryId === 0}
        onClick={handleClearCategory}
      />
      {content}
    </div>
  );
}

export default CategoryContainer;
