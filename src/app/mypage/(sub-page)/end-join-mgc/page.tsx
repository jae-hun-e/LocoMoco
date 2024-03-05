import MGCSummaryInfo from '@/app/mypage/(sub-page)/_components/MGCSummaryInfo';
import { dummyData } from '@/constants/mgcListDummy';

const EndMGC = () => {
  // TODO: API 연동 후 실데이터로 변경 [24/03/05]
  const endMGCData = dummyData;

  return (
    <>
      {endMGCData.map((mgc) => (
        <MGCSummaryInfo
          MGCInfo={mgc}
          key={mgc.id}
        >
          <MGCSummaryInfo.Reviews MGCId={mgc.id} />
        </MGCSummaryInfo>
      ))}
    </>
  );
};

export default EndMGC;
