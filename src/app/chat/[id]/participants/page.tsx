import { Button } from '@/components/ui/button';
import Image from 'next/image';

const participants = [
  { username: 'Nickname1', profileImg: '/oh.png', userId: 1 },
  { username: 'Nickname2222', profileImg: '/oh.png', userId: 2 },
  { username: 'Nickname3', profileImg: '/oh.png', userId: 3 },
  { username: 'Nickname4', profileImg: '/oh.png', userId: 4 },
];

const Participants = () => {
  return (
    <section>
      <ul className="flex flex-col gap-3">
        {participants.map(({ username, profileImg }) => (
          <li
            key={username}
            className="flex items-center justify-between border-b border-solid border-gray-300 pb-1"
          >
            <div className="flex items-center gap-2">
              <Image
                className="ml-1 rounded-3xl"
                src={profileImg}
                alt="good"
                width={30}
                height={30}
                priority
              />
              <p>{username}</p>
            </div>

            <Button className="mr-1 h-8 p-1">후기 보내기</Button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default Participants;
