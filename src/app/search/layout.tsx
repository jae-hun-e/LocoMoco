import { ReactNode } from 'react';
import { Metadata } from 'next';

interface Props {
  readonly children: ReactNode;
}

export const metadata: Metadata = {
  title: '검색',
  openGraph: {
    title: '검색',
  },
};

const SearchLayout = ({ children }: Props) => {
  return <>{children}</>;
};

export default SearchLayout;
