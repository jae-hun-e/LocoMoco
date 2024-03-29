import ProfileImg from '@/app/_components/ProfileImg';

interface PropfileProps {
  profileImg: string;
  nickname: string;
  job: string;
  userId: number;
}

const Profile = ({ profileImg, userId, nickname, job }: PropfileProps) => {
  return (
    <div className="border-layout-3 flex gap-11pxr border-b border-solid py-10pxr">
      <ProfileImg
        userId={userId}
        imgUrl={profileImg}
      />

      <div className="flex flex-col gap-3pxr text-sm">
        <p>{nickname}</p>
        <p>{job}</p>
      </div>
    </div>
  );
};

export default Profile;
