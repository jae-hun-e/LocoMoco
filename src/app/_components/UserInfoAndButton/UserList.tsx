import { Separator } from '@radix-ui/react-separator';
import UserListItem, { UserInfo } from './UserListItem';

interface UserListProps {
  data: UserInfo[];
  onClick: (targetId: number) => void;
  buttonName: string;
}

const UserList = ({ data, onClick, buttonName }: UserListProps) => {
  return (
    <ul>
      {data.length === 0 ? (
        <div>신고 목록이 없습니다!</div>
      ) : (
        data.map((el) => (
          <div key={el.userId}>
            <UserListItem
              data={el}
              onClick={onClick}
              buttonName={buttonName}
            />
            <Separator />
          </div>
        ))
      )}
    </ul>
  );
};

export default UserList;
