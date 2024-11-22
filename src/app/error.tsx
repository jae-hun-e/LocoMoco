'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <div className="flex h-[100vh]  w-full flex-col items-center justify-center gap-2">
      <Image
        src={'/error.png'}
        height={80}
        width={80}
        alt="error page image"
      />
      <div className="flex flex-col items-center justify-center">
        <p className="font-bold">오류가 발생했습니다.</p>
        <p className="text-[#9F9F9F]">이용에 불편을 드려죄송합니다.</p>
      </div>

      <Button onClick={() => router.replace('/')}>홈으로</Button>
    </div>
  );
};
export default Error;
