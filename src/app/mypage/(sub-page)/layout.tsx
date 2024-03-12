import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

interface Props {
  readonly children: ReactNode;
}
const SubPage = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default SubPage;
