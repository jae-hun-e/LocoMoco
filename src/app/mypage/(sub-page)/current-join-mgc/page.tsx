import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { dummyData } from '@/constants/mgcListDummy';

const CurrentMGC = () => {
  // TODO: API 연동 후 실데이터로 변경 [24/03/05]
  const currentMGCData = dummyData;

  return (
    <>
      {currentMGCData.map((mgc) => (
        <MGCSummaryInfo
          MGCInfo={mgc}
          key={mgc.id}
        >
          <MGCSummaryInfo.Chatting MGCId={mgc.id} />
        </MGCSummaryInfo>
      ))}
    </>
  );
};

export default CurrentMGC;
