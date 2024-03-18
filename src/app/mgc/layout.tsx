'use client';

import { ReactNode } from 'react';
import Header from '@/app/_components/header/Header';
import { toast } from '@/components/ui/use-toast';

const MGCDetailLayout = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  const handleShareBtnClick = () => {
    const url = window.document.location.href;

    if (!navigator.clipboard) {
      document.execCommand(url);
      toast({
        description: '복사가 완료되었습니다.',
      });
      return;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          description: '복사가 완료되었습니다.',
        });
      })
      .catch(() => {
        toast({
          description: '복사에 실패했습니다.',
        });
      });
  };

  return (
    <>
      <Header>
        <Header.Right>
          <Header.Share onClick={handleShareBtnClick} />
          <Header.Option />
        </Header.Right>
      </Header>
      {children}
    </>
  );
};

export default MGCDetailLayout;
