import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

interface Props {
  readonly children: ReactNode;
}
const AnotherLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AnotherLayout;
