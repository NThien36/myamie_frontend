import { ApiResponse } from "./app.interface";

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface CategoriesResponse extends ApiResponse {
  data: Category[];
}
