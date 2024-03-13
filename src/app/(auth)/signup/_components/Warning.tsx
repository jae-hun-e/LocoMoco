import { ReactNode } from 'react';
import { cn } from '@/libs/utils';

interface Props {
  good: boolean;
  children: ReactNode;
  className?: string;
}

const Warning = ({ good, children, className }: Props) => {
  return (
    <div className={cn(`absolute ${good ? 'text-main-1' : 'text-red-500'}`, className)}>
      {children}
    </div>
  );
};
export default Warning;
