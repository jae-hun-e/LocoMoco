import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

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
        <Avatar className="ml-1 rounded-3xl">
          <AvatarImage src={data.profileImg} />
          <AvatarFallback>{data.username}</AvatarFallback>
        </Avatar>
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
