export interface MGCList {
  data: MGCSummary[];
}

export interface MGCSummary {
  id: number;
  title: string;
  views: number;
  likeCount: number;
  maxParticipants: number;
  curParticipants: number;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  tags: number[];
}
