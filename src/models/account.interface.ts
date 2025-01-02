import { ApiResponse } from "./app.interface";
import { Category } from "./category.interface";
import { City } from "./city.interface";

export interface AccountProfile {
  firstName: string;
  lastName: string;
  shortDescription: string;
  description: string;
  avatar: string;
  cover: string;
  dateOfBirth: string;
  images: string[];
  characteristics: string[];

  city: City;
  categories: Category[];

  phone: string;
  address: string;
  openHour: number;
  closeHour: number;
}

export interface AccountProfileResponse extends ApiResponse {
  data: AccountProfile;
}

export interface UpdateProfileParams {
  firstName: string;
  lastName?: string;
  shortDescription?: string;
  description?: string;
  dateOfBirth?: string;
  characteristics?: string[];
  cityId: number;
  categoryIds: number[];
  // for update
  images?: string;
  imageFiles?: File[];
  keptImages?: string[];
}

export interface UpdateProfileBusinessParams {
  firstName: string;
  shortDescription: string;
  description?: string;
  cityId: number;
  categoryIds: number[];

  phone?: string;
  address?: string;
  openHour?: number;
  closeHour?: number;

  // for update
  images?: string;
  imageFiles?: File[];
  keptImages?: string[];
}

export interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
}

export interface AvatarWName {
  id: number;
  avatar: string;
  name: string;
}

export interface AvatarWNameResponse extends ApiResponse {
  data: AvatarWName;
}
