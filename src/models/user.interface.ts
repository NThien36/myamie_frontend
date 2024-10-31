import { Category } from "./category.interface";

export interface User {
  id: number;
  avatar: string;
  name: string;
  shortDescription: string;
  distance: number;
  city: string;
  characteristics: string[];
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
