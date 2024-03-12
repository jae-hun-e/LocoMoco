import StarList from '@/app/chat/_components/review/StarList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { UserInfoData } from './ReviewItem';

const UserInfo = ({ userInfo }: { userInfo: UserInfoData }) => {
  return (
    <>
      <section className="my-10pxr">
        <div className="flex items-center gap-2">
          <Avatar className="h-32pxr w-32pxr rounded-full ">
            <AvatarImage
              src={userInfo.profileImage.path || 'https://github.com/shadcn.png'}
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
          <div className="flex flex-col gap-3pxr">
            <span className="mr-10pxr text-xs">{userInfo.nickname}</span>
            <div className="flex items-center gap-2">
              <div className="flex">
                <StarList
                  rating={userInfo.score}
                  fisrtNumber={1}
                  color="#58C694"
                  size={15}
                />
                <StarList
                  rating={5 - userInfo.score}
                  fisrtNumber={userInfo.score + 1}
                  color="#D9D9D9"
                  size={15}
                />
              </div>
              <span className="text-xs text-layer-6">
                {formatDistance(new Date(userInfo.createdAt), new Date(), {
                  addSuffix: true,
                  locale: ko,
                })}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserInfo;
