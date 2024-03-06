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
    <li
      key={data.username}
      className="flex items-center justify-between border-b border-solid border-gray-300 pb-1"
    >
      <div className="flex items-center gap-2">
        <Image
          className="ml-1 rounded-3xl"
          src={data.profileImg}
          alt="good"
          width={30}
          height={30}
          priority
        />
        <p>{data.username}</p>
      </div>

      <Button
        className="mr-1 h-8 p-1"
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
