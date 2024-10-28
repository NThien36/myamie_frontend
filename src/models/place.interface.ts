import { Category } from "./category.interface";

export interface Place {
  id: number;
  name: string;
  shortDescription: string;
  cover: string;
  city: string;
  dateCreated: string;
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
  city: string;
  ownerId: number;
  ownerAvatar: string;
  ownerName: string;

  categories: Category[];
}
