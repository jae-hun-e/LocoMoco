import { ReactNode } from 'react';

interface Props {
  good: boolean;
  children: ReactNode;
}

const Warning = ({ good, children }: Props) => {
  return <div className={`absolute ${good ? 'text-main-1' : 'text-red-500'}`}>{children}</div>;
};
export default Warning;
