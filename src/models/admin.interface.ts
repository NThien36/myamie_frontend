import {
  AccountRoleEnum,
  AccountStatusEnum,
  ApiResponse,
  FilterParams,
  Pagination,
  PlaceStatusEnum,
} from "./app.interface";
import { PlaceAdmin } from "./place.interface";
import { UserAdmin } from "./user.interface";

export interface UsersAdminParams extends FilterParams {
  cityId?: number;
  Role?: AccountRoleEnum;
  Status?: AccountStatusEnum;
}

interface DataResponse {
  users: UserAdmin[];
  pagination: Pagination;
}

export interface UsersAdminResponse extends ApiResponse {
  data: DataResponse;
}

// ==== PLACE ====
export interface PlacesAdminParams extends FilterParams {
  cityId?: number;
  Status?: PlaceStatusEnum;
}

interface PlaceDataResponse {
  places: PlaceAdmin[];
  pagination: Pagination;
}

export interface PlacesAdminResponse extends ApiResponse {
  data: PlaceDataResponse;
}
