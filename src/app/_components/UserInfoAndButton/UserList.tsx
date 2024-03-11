import { Separator } from '@radix-ui/react-separator';
import UserListItem, { UserInfo } from './UserListItem';

interface UserListProps {
  data: UserInfo[];
  onClick: (id: number) => void;
  buttonName: string;
}

const UserList = ({ data, onClick, buttonName }: UserListProps) => {
  if (data.length !== 0) {
    return (
      <section>
        <ul>
          {data.map((el) => (
            <div key={el.userId}>
              <UserListItem
                data={el}
                onClick={onClick}
                buttonName={buttonName}
              />
              <Separator />
            </div>
          ))}
        </ul>
      </section>
    );
  } else {
    return <div>신고 목록이 없습니다!</div>;
  }
};

export default UserList;
