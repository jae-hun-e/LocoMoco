import { MGCSummary } from '@/types/MGCList';

export const dummyData: MGCSummary[] = [
  {
    id: 1,
    title: '모각코 구함',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('1995-12-17T03:24:00'),
    views: 3,
    likeCount: 30,
    curParticipants: 2,
    maxParticipants: 8,
    tags: [1, 2, 3],
  },
  {
    id: 2,
    title: '면접 준비 같이해요~',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('2023-12-17T03:24:00'),
    views: 3,
    likeCount: 30,
    curParticipants: 2,
    maxParticipants: 3,
    tags: [1, 2, 3],
  },
  {
    id: 3,
    title: '번개 모각코 하실 분~!',
    location: {
      address: '구로동',
      latitude: 37.48,
      longitude: 126.8,
    },
    // createAt: new Date('2024-02-14T00:24:00'),
    views: 10,
    likeCount: 20,
    curParticipants: 1,
    maxParticipants: 5,
    tags: [1, 2, 3],
  },
];
