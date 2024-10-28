import { Category } from "@/models/category.interface";

interface CategoryItemProps {
  category: Category;
  onClick?: () => void;
}

function CategoryItem({ category, onClick }: CategoryItemProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-2 border-2 border-primary rounded-full py-1 px-3 w-fit bg-white hover:bg-primary-lighter hover:cursor-pointer"
    >
      <input type="number" value={category.id} hidden readOnly />
      <i className={`text-primary fa-sm fa-regular ${category.icon}`}></i>
      <p>{category.name}</p>
    </div>
  );
}

export default CategoryItem;
