import { Category } from "@/models/category.interface";
import cx from "classnames";

interface CategoryItemProps {
  category: Category;
  onClick?: () => void;
  isActive?: boolean;
}

function CategoryItem({ category, onClick, isActive }: CategoryItemProps) {
  return (
    <div
      onClick={onClick}
      // className="flex items-center gap-2 border-2 border-primary rounded-full py-1 px-3 w-fit bg-white hover:bg-primary-lighter hover:cursor-pointer"

      className={cx(
        "flex items-center gap-2 border-2 border-primary rounded-full py-1 px-3 w-fit hover:bg-primary-light hover:cursor-pointer transition-colors",
        {
          "bg-primary-light": isActive,
          "bg-white": !isActive, // Add conditional class for active state
        }
      )}
    >
      <input type="number" value={category.id} hidden readOnly />
      <i
        className={cx(
          "fa-sm fa-regular text-primary", // Always applied classes for icon
          category.icon // Dynamic icon class
        )}
      ></i>
      <p>{category.name}</p>
    </div>
  );
}

export default CategoryItem;
