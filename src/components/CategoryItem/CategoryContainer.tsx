import CategoryItem from "./CategoryItem";
import { useGetCategories } from "@/services/category.service";
import Loader from "../Loader/Loader";

function CategoryContainer() {
  const { data, isLoading, isError } = useGetCategories();

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    content = <p className="error">Lỗi, vui lòng thử lại</p>;
  } else {
    content = data?.data?.map((category) => (
      <CategoryItem
        key={category.id}
        category={category}
        onClick={() => console.log("Category clicked:", category)}
      />
    ));
  }

  return (
    <div className="flex justify-center gap-3 mt-7 flex-wrap md:w-4/5 mx-auto">
      {content}
    </div>
  );
}

export default CategoryContainer;
