'use client';

import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="mt-100pxr flex h-full w-full flex-col items-center justify-center space-y-4">
      <h2 className="text-3xl font-bold">404 Not Found</h2>
      <p>죄송합니다. 페이지를 찾을 수 없습니다.</p>
      <p>존재하지 않는 주소를 입력하셨거나,</p>
      <p>요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.</p>
      <button
        onClick={() => router.back()}
        className="mt-50pxr flex text-xl font-bold"
      >
        <ChevronLeftIcon />
        이전으로 돌아가기
      </button>
    </div>
  );
};
export default NotFound;
