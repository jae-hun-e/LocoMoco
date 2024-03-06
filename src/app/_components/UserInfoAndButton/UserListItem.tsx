import { Button } from '@/components/ui/button';
import Image from 'next/image';

export interface UserInfo {
  username: string;
  profileImg: string;
  userId: number;
}

interface UserListProps {
  data: UserInfo;
  onClick: (id: number) => void;
  buttonName: string;
}

const UserListItem = ({ data, onClick, buttonName }: UserListProps) => {
  return (
    <li className="flex w-full items-center justify-between border-b border-solid py-14pxr">
      <div className="flex items-center gap-4">
        <Image
          className="ml-1 rounded-3xl"
          src={data.profileImg}
          alt="profile image"
          width={40}
          height={40}
          priority
        />
        <p>{data.username}</p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="border-1pxr w-84pxr border-solid border-main-1 text-sm text-main-1 hover:border-hover hover:bg-white hover:text-hover"
        onClick={() => {
          onClick(data.userId);
        }}
      >
        {buttonName}
      </Button>
    </li>
  );
};

export default UserListItem;
