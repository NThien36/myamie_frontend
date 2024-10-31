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
