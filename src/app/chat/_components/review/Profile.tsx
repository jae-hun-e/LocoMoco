import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface PropfileProps {
  profileImg: string;
  nickname: string;
  job: string;
}

const Profile = ({ profileImg, nickname, job }: PropfileProps) => {
  return (
    <div className="border-layout-3 flex gap-11pxr border-b border-solid py-10pxr">
      <Avatar className="h-32pxr w-32pxr rounded-full ">
        <AvatarImage
          src={profileImg}
          alt="profile image"
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

      <div className="flex flex-col gap-3pxr text-sm">
        <p>{nickname}</p>
        <p>{job}</p>
      </div>
    </div>
  );
};

export default Profile;
