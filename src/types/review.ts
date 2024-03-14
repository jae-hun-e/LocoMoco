export interface ReviewSummary {
  reviewId: number;
  reviewContentId: number[];
  content: string;
  userId: number;
  nickname: string;
  job: string;
  profileImage: {
    imageId: number;
    path: string;
  } | null;
  score: number;
  createdAt: string;
}

export interface Reviews {
  reviewId: number;
  reviewerId: number;
  revieweeId: number;
  score: number;
  reviewContentId: number[];
  content: string;
  createdAt: string;
}

export interface ReviewDetailType {
  reviewContentId: number[];
  content: string;
  nickname: string;
}
