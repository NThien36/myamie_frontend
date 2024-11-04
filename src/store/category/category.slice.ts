// src/store/slices/citiesSlice.js
import { Category } from "@/models/category.interface";
import { createSlice } from "@reduxjs/toolkit";

interface categoriesState {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: categoriesState = {
  categories: [],
  isLoading: false,
  isError: false,
};

const categoriesSlice = createSlice({
  name: "@categories",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    setLoading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    setError(state) {
      state.isLoading = false;
      state.isError = true;
    },
  },
});

export const { setCategories, setLoading, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
