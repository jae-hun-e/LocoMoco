import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';
import HeaderOptionContent from '../_components/HeaderOptionContent';

interface Props {
  readonly children: ReactNode;
}
const AnotherMainLayout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <Header.Right>
          <Header.Option>
            <HeaderOptionContent />
          </Header.Option>
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default AnotherMainLayout;
