import {
  ApiResponse,
  FeedbackTargetTypeEnum,
  FilterParams,
  Pagination,
} from "./app.interface";

export interface AddFeedbackParams {
  targetId: number;
  targetType: FeedbackTargetTypeEnum;
  content: string;
  rating: number;
}

export interface UpdateFeedbackParams {
  id: number;
  rating: number;
  content?: string;
}

export interface ResponseFeedbackParams {
  id: number;
  message: string;
}

export interface Feedback {
  id: number;
  avatar: string;
  name: string;
  dateCreated: string;
  rating: number;
  content: string;
  response?: string;
  targetId: number;
  senderId: number;
}

export interface FeedbackInfo {
  feedbacks: Feedback[];
  averageRating: number;
  totalFeedback: number;
}

export interface FeedbacksParams extends FilterParams {
  id?: number;
  status?: "response" | "unresponse";
  rate?: number;
}

export interface DataResponse {
  feebacks: Feedback[];
  averageRating: number;
  totalFeedback: number;
  pagination: Pagination;
}

export interface FeedbacksResponse extends ApiResponse {
  data: DataResponse;
}
