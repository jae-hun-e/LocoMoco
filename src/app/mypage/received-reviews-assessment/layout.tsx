import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

const ReceivedReviewsLayout = ({
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

export default ReceivedReviewsLayout;
