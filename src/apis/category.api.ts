import { CategoriesResponse } from "@/models/category.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getCategories = async () => {
  const response: AxiosResponse<CategoriesResponse> = await fetchAPI.request({
    url: "/Category/get-all",
    method: "get",
  });

  return response.data;
};
