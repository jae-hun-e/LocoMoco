import StarList from '@/app/chat/_components/review/StarList';
import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';
import ProfileImg from '../ProfileImg';
import { UserInfoData } from './ReviewItem';

const UserInfo = ({ userInfo }: { userInfo: UserInfoData }) => {
  return (
    <>
      <section className="my-10pxr">
        <div className="flex items-center gap-2">
          <ProfileImg
            userId={userInfo.userId}
            imgUrl={userInfo.profileImage?.path}
          />
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
