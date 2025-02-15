import { ApiResponse, FilterParams, Pagination } from "./app.interface";
import { Category } from "./category.interface";
import { City } from "./city.interface";

export interface Place {
  id: number;
  name: string;
  shortDescription: string;
  cover: string;
  city: string;
  dateCreated: string;
  ownerId: number;
  ownerAvatar: string;
  ownerName: string;
}

export interface PlaceDetail {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  images: string[];
  address: string;
  dateCreated: string;
  city: City;
  ownerId: number;
  ownerAvatar: string;
  ownerName: string;

  categories: Category[];
}

export interface PlaceAdmin {
  id: number;
  cover: string;
  name: string;
  city: string;
  ownerAvatar: string;
  ownerName: string;
  status: string;
  action?: string;
}

export interface PlacesParams extends FilterParams {
  cityId?: number;
  categoryId?: number;
  userId?: number;
}

interface DataResponse {
  places: Place[];
  pagination: Pagination;
}

export interface PlacesResponse extends ApiResponse {
  data: DataResponse;
}

export interface PlaceDetailResponse extends ApiResponse {
  data: PlaceDetail;
}

export interface UpsertPlaceParams {
  id?: number;
  name: string;
  shortDescription: string;
  description: string;
  cityId: number;
  categoryIds: number[];
  address: string;

  // for update
  images?: string;
  imageFiles?: File[];
  keptImages?: string[];
}
