'use client';

import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';
import { useThunderModalStore } from '@/store/thunderModalStore';

const ChatLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const { toggleModal } = useThunderModalStore();

  return (
    <>
      <Header>
        <Header.Right>
          <Header.Menu onClick={() => toggleModal()} />
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default ChatLayout;
