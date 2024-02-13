import MGCList from '@/app/_components/MGCList/MGCList';
import { MGCSummary, MGCTypes } from '@/app/_components/MGCList/MGCListItem';

const dummyData: MGCSummary[] = [
  {
    _id: 1,
    title: '모각코 구함',
    location: '구로동',
    createAt: new Date('1995-12-17T03:24:00'),
    hits: 3,
    likeCount: 30,
    tag: ['코딩테스트', 'javascript', 'FE'],
    currentParticipantsCount: 2,
    maxParticipantsCount: 8,
    MGCType: MGCTypes.LocationNotConfirmed,
  },
  {
    _id: 2,
    title: '모각코 구함2',
    location: '남가좌동',
    createAt: new Date('2023-12-17T03:24:00'),
    hits: 3,
    likeCount: 30,
    tag: ['코딩테스트', 'javascript', 'FE'],
    currentParticipantsCount: 2,
    maxParticipantsCount: 3,
    MGCType: MGCTypes.LocationConfirmed,
  },
  {
    _id: 3,
    title: '번개로 만나실분 구함',
    location: '구로동',
    createAt: new Date('2024-02-14T00:24:00'),
    hits: 10,
    likeCount: 20,
    tag: ['코딩테스트', 'javascript', 'FE'],
    currentParticipantsCount: 1,
    maxParticipantsCount: 5,
    MGCType: MGCTypes.ThunderMGC,
  },
];

const SearchMGC = () => {
  return (
    <div>
      {/* Todo: filter 가져와야 함 [2024/02/13] */}
      <MGCList data={dummyData}></MGCList>
    </div>
  );
};

export default SearchMGC;
