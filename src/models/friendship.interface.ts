import {
  ApiResponse,
  FilterParams,
  FriendshipStatusEnum,
  Pagination,
} from "./app.interface";

export interface FriendshipsParams extends FilterParams {}

export interface Friendship {
  id: number;
  name: string;
  avatar: string;
  status: FriendshipStatusEnum;
  receiverId: number;
  otherId: number;
}

interface DataResponse {
  friends: Friendship[];
  pagination: Pagination;
}

export interface FriendshipsResponse extends ApiResponse {
  data: DataResponse;
}
