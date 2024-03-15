import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';

interface Props {
  readonly children: ReactNode;
}
const AnotherMainLayout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <Header.Right>
          <Header.Option />
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default AnotherMainLayout;
