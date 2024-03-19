'use client';

import { useEffect } from 'react';
import { clearItem, getItem } from '@/utils/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Signin = () => {
  const router = useRouter();

  useEffect(() => {
    if (getItem(localStorage, 'token')) {
      alert('잘못된 접근입니다. 홈으로 돌아갑니다');
      clearItem(sessionStorage);
      router.replace('/');
    }
  }, [router]);

  return (
    <section className="mx-auto flex h-svh flex-col items-center justify-center gap-3">
      <div className="mb-5 text-3xl font-bold">LocoMoco</div>
      <Link
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      >
        <button className="flex h-50pxr w-240pxr items-center justify-center gap-8 rounded-sm bg-black opacity-70 hover:opacity-100">
          <Image
            src={'github.svg'}
            alt="github"
            width={30}
            height={30}
          />
          <span className="text-white">깃허브로 로그인</span>
        </button>
      </Link>

      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locomoco.kro.kr'}/redirect/kakao&response_type=code`}
      >
        <button className="flex h-50pxr w-240pxr items-center justify-center gap-8 rounded-sm bg-[#fdd801] opacity-70 hover:opacity-100">
          <Image
            src={'kakao.svg'}
            alt="kakao"
            width={30}
            height={30}
          />
          <span>카카오로 로그인</span>
        </button>
      </Link>
    </section>
  );
};

export default Signin;
