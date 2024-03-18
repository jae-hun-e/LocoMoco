import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

const MGCEditLayout = ({
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

export default MGCEditLayout;
