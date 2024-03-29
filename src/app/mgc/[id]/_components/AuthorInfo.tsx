import { UserInfo } from '@/apis/mgc/useGetMGCDetail';
import ProfileImg from '@/app/_components/ProfileImg';
import { formatDistance } from 'date-fns';
import { ko } from 'date-fns/locale';

interface Props {
  author: UserInfo;
  hits: number;
  createdAt: string;
  updatedAt: string;
}
const AuthorInfo = ({
  author: { nickname, profileImage, userId },
  hits,
  createdAt,
  updatedAt,
}: Props) => {
  return (
    <section className="my-10pxr flex gap-11pxr">
      <ProfileImg
        userId={userId}
        imgUrl={profileImage?.path}
      />
      <div className="flex flex-col gap-3pxr">
        <p>{nickname}</p>
        <p className="font-extralight">
          {updatedAt && updatedAt > createdAt
            ? formatDistance(updatedAt, new Date(), { addSuffix: true, locale: ko }) + ' (수정됨) '
            : formatDistance(createdAt, new Date(), { addSuffix: true, locale: ko })}{' '}
          · 조회
          {hits}
        </p>
      </div>
    </section>
  );
};

export default AuthorInfo;
