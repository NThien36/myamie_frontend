import { City } from "./../../models/city.interface";
// src/store/slices/citiesSlice.js
import { createSlice } from "@reduxjs/toolkit";

interface CitiesState {
  cities: City[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: CitiesState = {
  cities: [],
  isLoading: false,
  isError: false,
};

const citiesSlice = createSlice({
  name: "@cities",
  initialState,
  reducers: {
    setCities(state, action) {
      state.cities = action.payload;
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

export const { setCities, setLoading, setError } = citiesSlice.actions;
export default citiesSlice.reducer;
