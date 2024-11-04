import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/auth.slice";
import citiesReducer from "./city/city.slice";
import categoriesReducer from "./category/category.slice";

const reducers = {
  auth: authReducer,
  cities: citiesReducer,
  categories: categoriesReducer,
};

export default combineReducers(reducers);
