import AuthorInfo from '@/app/mgc/[id]/_components/AuthorInfo';
import Inquiry from '@/app/mgc/[id]/_components/Inquiry';
import MGCApplyArea from '@/app/mgc/[id]/_components/MGCApplyArea';
import MGCInfo from '@/app/mgc/[id]/_components/MGCInfo';
import MGCParticipants from '@/app/mgc/[id]/_components/MGCParticipants';
import { Separator } from '@/components/ui/separator';
import { dummyData } from '@/constants/mgcDummyData';

// TODO: api연결 후 더미 제거 [24/02/15]
const MGCDetail = () => {
  const MGCInfoData = {
    title: dummyData.title,
    location: dummyData.location,
    startTime: dummyData.startTime,
    endTime: dummyData.endTime,

    MGCType: dummyData.MGCType,
    languageTypes: dummyData.languageTypes,
    studyTypes: dummyData.studyTypes,
    job: dummyData.job,
    ageRange: dummyData.ageRange,
    content: dummyData.content,
  };

  return (
    <div>
      <AuthorInfo
        author={dummyData.author}
        hits={dummyData.hits}
      />
      <Separator className="my-15pxr" />

      {/* TODO: 협의 후 모각코 생성쪽에서 공통 컴포넌트로 빼기 [24/02/09]*/}
      <MGCInfo {...MGCInfoData} />

      <MGCParticipants joinUsers={dummyData.joinUsers} />
      <Separator className="my-15pxr" />

      <Inquiry inquiries={dummyData.inquiries} />

      <MGCApplyArea
        maxParticipantsCount={dummyData.maxParticipantsCount}
        endTime={dummyData.endTime}
        like={dummyData.like}
      />
    </div>
  );
};

export default MGCDetail;
