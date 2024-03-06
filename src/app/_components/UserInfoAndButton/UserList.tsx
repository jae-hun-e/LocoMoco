import { Separator } from '@radix-ui/react-separator';
import UserListItem, { UserInfo } from './UserListItem';

interface UserListProps {
  data: UserInfo[];
  onClick: (id: number) => void;
  buttonName: string;
}

const UserList = ({ data, onClick, buttonName }: UserListProps) => {
  return (
    <section>
      <ul className="">
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
};

export default UserList;
