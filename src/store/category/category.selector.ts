import { AppState } from "../store";

export const categoriesSelector = (state: AppState) =>
  state.categories.categories;
export const categoriesLoadingSelector = (state: AppState) =>
  state.categories.isLoading;
export const categoriesErrorSelector = (state: AppState) =>
  state.categories.isError;
