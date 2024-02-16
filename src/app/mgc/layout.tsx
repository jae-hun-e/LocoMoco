import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

const MGCDetailLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return (
    <>
      <Header>
        <Header.Right>
          <Header.Share />
          <Header.Option />
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default MGCDetailLayout;
