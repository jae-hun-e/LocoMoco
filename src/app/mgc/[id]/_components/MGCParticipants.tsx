import { UserInfo } from '@/apis/mgc/useGetMGCDetail';
import ProfileImg from '@/app/_components/ProfileImg';

interface Props {
  joinUsers: UserInfo[];
}
// TODO: 참가자 프로필 이미지 추가하기[24/03/04]
// TODO: 참가자 프로필 디테일 페이지 생성 후 연결[24/03/04]
const MGCParticipants = ({ joinUsers }: Props) => {
  return (
    <div className="mb-10pxr mt-14pxr">
      <p>현재 참여자</p>
      <div className="mt-10pxr flex gap-11pxr">
        {joinUsers.length ? (
          joinUsers.map(({ userId, nickname, profileImage }) => (
            <div
              key={userId}
              className="flex flex-col items-center justify-center"
            >
              <ProfileImg
                userId={userId}
                imgUrl={profileImage?.path}
              />
              <p className="text-sm">{nickname}</p>
            </div>
          ))
        ) : (
          <p className="text-sm">참여자가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default MGCParticipants;
