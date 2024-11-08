import { FilterParams, Pagination } from "./app.interface";

export interface Feedback {
  id: number;
  avatar: string;
  name: string;
  dateCreated: string;
  rating: number;
  content: string;
  response?: string;
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

export interface FeedbacksResponse {
  feebacks: Feedback[];
  averageRating: number;
  totalFeedback: number;
  pagination: Pagination;
}
