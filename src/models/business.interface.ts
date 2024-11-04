import { ApiResponse, FilterParams, Pagination } from "./app.interface";
import { Category } from "./category.interface";

export interface Business {
  id: number;
  avatar: string;
  name: string;
  shortDescription: string;
  operatingHours: string;
  city: string;
  cover: string;
  rate: number;
  totalFeedback: number;
}

export interface BusinessDetail {
  id: number;
  cover: string;
  avatar: string;
  name: string;
  shortDescription: string;
  categories: Category[];
  city: string;
  phone: string;
  address: string;
  operatingHours: string;
  description: string;
  images: string[];
}

export interface BusinessesParams extends FilterParams {
  cityId?: number;
  categoryId?: number;
}

interface DataResponse {
  businesses: Business[];
  pagination: Pagination;
}

export interface BusinessesResponse extends ApiResponse {
  data: DataResponse;
}

export interface BusinessDetailResponse extends ApiResponse {
  data: BusinessDetail;
}
