import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

const ChatLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header>
        <Header.Right>
          <Header.Menu />
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default ChatLayout;
