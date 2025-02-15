import {
  ApiResponse,
  FilterParams,
  FriendshipStatusEnum,
  Pagination,
} from "./app.interface";
import { Category } from "./category.interface";

export interface User {
  id: number;
  avatar: string;
  name: string;
  shortDescription: string;
  distance: number;
  city: string;
  characteristics: string[];
  friendStatus: FriendshipStatusEnum;
  receiverId: number;
}

export interface UserDetail {
  id: number;
  cover: string;
  avatar: string;
  name: string;
  shortDescription: string;
  categories: Category[];
  characteristics: string[];
  distance: number;
  city: string;
  description: string;
  images: string[];
}

export interface UserAdmin {
  id: number;
  avatar: string;
  name: string;
  email: string;
  city: string;
  role: string;
  status: string;
  action?: string;
}

export interface UsersParams extends FilterParams {
  categoryId?: number;
  distanceInKm?: number;
  latitude?: number;
  longitude?: number;
}

interface DataResponse {
  users: User[];
  pagination: Pagination;
}

export interface UsersResponse extends ApiResponse {
  data: DataResponse;
}

export interface UserDetailResponse extends ApiResponse {
  data: UserDetail;
}
