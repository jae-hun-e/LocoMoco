import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '채팅',
  openGraph: {
    title: '채팅',
  },
};

interface Props {
  readonly children: ReactNode;
}
const ChatLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default ChatLayout;
