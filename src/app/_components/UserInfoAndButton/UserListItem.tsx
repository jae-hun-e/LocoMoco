import { Button } from '@/components/ui/button';
import { getItem } from '@/utils/storage';
import ProfileImg from '../ProfileImg';

export interface UserInfo {
  userId: number;
  nickname: string;
  profileImage: {
    imageId: number;
    path: string;
  } | null;
}

interface UserListItemProps {
  data: UserInfo;
  onClick: (targetId: number) => void;
  buttonName: string;
}

const UserListItem = ({ data, onClick, buttonName }: UserListItemProps) => {
  const me = getItem(localStorage, 'userId');

  return (
    <li className="flex w-full items-center justify-between border-b border-solid py-14pxr">
      <div className="flex items-center gap-4">
        <ProfileImg
          userId={data.userId}
          imgUrl={data.profileImage?.path}
        />
        <p>{data.nickname}</p>
      </div>

      {me !== data.userId.toString() && (
        <Button
          type="button"
          variant="outline"
          className="border-1pxr w-84pxr border-solid border-main-1 text-sm text-main-1 hover:border-hover hover:bg-white hover:text-hover"
          onClick={() => onClick(data.userId)}
        >
          {buttonName}
        </Button>
      )}
    </li>
  );
};

export default UserListItem;
