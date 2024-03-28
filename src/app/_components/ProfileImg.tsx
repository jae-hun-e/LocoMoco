import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

interface ProfileImg {
  userId: number;
  imgUrl?: string;
}

const ProfileImg = ({ userId, imgUrl }: ProfileImg) => {
  return (
    <Link href={`/another/${userId}`}>
      <Avatar className="h-32pxr w-32pxr rounded-full ">
        <AvatarImage
          src={imgUrl || 'https://github.com/shadcn.png'}
          alt="유저 이미지"
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
    </Link>
  );
};

export default ProfileImg;
