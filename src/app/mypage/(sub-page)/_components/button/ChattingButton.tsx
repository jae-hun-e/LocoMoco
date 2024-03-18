'use client';

import MainStyleButton from '@/components/MainStyleButton';
import { routes } from '@/constants/routeURL';
import Link from 'next/link';

const ChattingButton = ({ MGCId }: { MGCId: number }) => {
  return (
    <Link href={`${routes.chat}/${MGCId}`}>
      <MainStyleButton content="채팅방으로 이동" />
    </Link>
  );
};

export default ChattingButton;
