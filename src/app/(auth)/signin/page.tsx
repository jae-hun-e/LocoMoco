'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const Signin = () => {
  const handleGithubLogin = () => {};
  const handleKakaoLogin = () => {};

  return (
    <section className="mx-auto flex h-full flex-col items-center justify-center gap-3">
      <div className="mb-5 text-3xl font-bold">LocoMoco</div>
      <Button
        onClick={handleGithubLogin}
        className="gap-1 bg-[#68CB9F]"
      >
        <Image
          src={'github.svg'}
          alt="github"
          width={30}
          height={30}
        />

        <div>Github으로 로그인</div>
      </Button>
      <Button
        onClick={handleKakaoLogin}
        className="gap-1 bg-[#68CB9F]"
      >
        <Image
          src={'kakaotalk.svg'}
          alt="github"
          width={30}
          height={30}
        />
        <div>카카오톡으로 로그인</div>
      </Button>
    </section>
  );
};

export default Signin;
