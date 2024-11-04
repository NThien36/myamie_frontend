import { CitiesResponse } from "@/models/city.interface";
import fetchAPI from "@/utils/fetchApi";
import { AxiosResponse } from "axios";

export const getCities = async () => {
  const response: AxiosResponse<CitiesResponse> = await fetchAPI.request({
    url: "/City/get-all",
    method: "get",
  });

  return response.data;
};
