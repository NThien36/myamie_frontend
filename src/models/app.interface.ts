export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  BUSINESS = "BUSINESS",
}

export enum AccountStatusEnum {
  ACTIVATED = 1,
  SUSPENDED = 2,
}

export enum AccountRoleEnum {
  USER = 2,
  BUSINESS = 3,
}

export enum PlaceStatusEnum {
  ACTIVATED = 1,
  SUSPENDED = 2,
}

export interface ApiResponse {
  isSuccess: boolean;
  message: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

export interface FilterParams {
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}
