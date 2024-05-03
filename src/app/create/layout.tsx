import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '모각코 생성',
  openGraph: {
    title: '모각코 생성',
  },
};

const MGCCreateLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MGCCreateLayout;
