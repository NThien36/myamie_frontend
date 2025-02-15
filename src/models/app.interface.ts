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

export enum FeedbackTargetTypeEnum {
  BUSINESS = 1,
  PLACE = 2,
  USER = 3,
}

export enum FriendshipStatusEnum {
  NONE = 0,
  PENDING = 1,
  ACCEPTED = 2,
  BLOCKED = 3,
}

export enum MessageStatusEnum {
  SENT = 1,
  DELIVERED = 2,
  READ = 3,
  RECALLED = 4,
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
