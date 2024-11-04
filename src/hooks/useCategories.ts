import { useGetCategories } from "@/services/category.service";
import {
  categoriesErrorSelector,
  categoriesLoadingSelector,
  categoriesSelector,
} from "@/store/category/category.selector";
import {
  setCategories,
  setError,
  setLoading,
} from "@/store/category/category.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(categoriesSelector);
  const isLoading = useSelector(categoriesLoadingSelector);
  const isError = useSelector(categoriesErrorSelector);

  const {
    data,
    isLoading: queryLoading,
    isError: queryError,
  } = useGetCategories();

  useEffect(() => {
    if (queryLoading) {
      dispatch(setLoading());
    } else if (queryError) {
      dispatch(setError());
    } else if (data?.data) {
      dispatch(setCategories(data.data));
    }
  }, [data, queryLoading, queryError, dispatch]);

  return { categories, isLoading, isError };
};
