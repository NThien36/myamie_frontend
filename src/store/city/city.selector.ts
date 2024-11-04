import { AppState } from "../store";

export const citiesSelector = (state: AppState) => state.cities.cities;
export const citiesLoadingSelector = (state: AppState) =>
  state.cities.isLoading;
export const citiesErrorSelector = (state: AppState) => state.cities.isError;
