import { ReactNode } from 'react';
import Header from '@/app/_components/Header';

const IsHeaderLayout = ({
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

export default IsHeaderLayout;
