import { UserInfo } from '@/apis/mgc/useGetMGCDetail';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

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
          joinUsers.map(({ userId, nickname }) => (
            <div
              key={userId}
              className="flex flex-col items-center justify-center"
            >
              <Avatar className="h-32pxr w-32pxr rounded-full ">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="참가자 정보"
                />
                <AvatarFallback>
                  <Image
                    src={'/oh.png'}
                    alt={'cn'}
                    width={32}
                    height={32}
                  />
                </AvatarFallback>
              </Avatar>
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
