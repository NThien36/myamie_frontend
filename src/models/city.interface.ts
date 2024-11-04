import { ApiResponse } from "./app.interface";

export interface City {
  id: number;
  name: string;
}

export interface CitiesResponse extends ApiResponse {
  data: City[];
}
