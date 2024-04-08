import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: '마이페이지',
  openGraph: {
    title: '마이페이지',
  },
};

const MyPageLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default MyPageLayout;
