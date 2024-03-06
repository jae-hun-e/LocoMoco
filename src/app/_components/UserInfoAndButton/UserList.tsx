import UserListItem, { UserInfo } from './UserListItem';

interface UserListProps {
  data: UserInfo[];
  onClick: (id: number) => void;
  buttonName: string;
}

const UserList = ({ data, onClick, buttonName }: UserListProps) => {
  return (
    <section>
      <ul className="flex flex-col gap-3">
        {data.map((el) => (
          <UserListItem
            key={el.userId}
            data={el}
            onClick={onClick}
            buttonName={buttonName}
          />
        ))}
      </ul>
    </section>
  );
};

export default UserList;
