import { LocationInfo } from '@/apis/mgc/queryFn';

export interface MGCList {
  data: MGCSummary[];
}

export interface MGCSummary {
  id: number;
  title: string;
  views: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  maxParticipants: number;
  curParticipants: number;
  location: LocationInfo;
  tags: number[];
}
