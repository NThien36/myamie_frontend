import { categoryData } from "@/assets/data/category";
import CategoryItem from "./CategoryItem";

function CategoryContainer() {
  return (
    <div className="flex justify-center gap-3 mt-7 flex-wrap w-4/5 mx-auto">
      {categoryData.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          onClick={() => "d"}
        />
      ))}
    </div>
  );
}

export default CategoryContainer;
