export interface MGCList {
  data: MGCDetail[];
}

export interface MGCDetail {
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
