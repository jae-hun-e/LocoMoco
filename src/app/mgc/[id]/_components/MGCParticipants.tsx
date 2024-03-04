import { UserInfo } from '@/apis/mgc/useGetMGCDetail';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface Props {
  joinUsers: UserInfo[];
}
const MGCParticipants = ({ joinUsers }: Props) => {
  return (
    <div className="mb-10pxr mt-14pxr">
      <p>현재 참여자</p>
      <div className="mt-10pxr flex gap-11pxr">
        {joinUsers.map(({ userId, nickname }) => (
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
        ))}
      </div>
    </div>
  );
};

export default MGCParticipants;
