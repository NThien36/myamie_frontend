export enum RoleEnum {
  USER = "USER",
  ADMIN = "ADMIN",
  BUSINESS = "BUSINESS",
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
