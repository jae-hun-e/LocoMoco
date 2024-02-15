'use client';

import Image from 'next/image';

const Signin = () => {
  const handleGithubLogin = () => {};
  const handleKakaoLogin = () => {};

  return (
    <section className="mx-auto flex h-full flex-col items-center justify-center gap-3">
      <div className="mb-5 text-3xl font-bold">LocoMoco</div>
      <button
        onClick={handleGithubLogin}
        className="flex h-50pxr w-240pxr items-center justify-center gap-8 rounded-sm bg-black opacity-70 hover:opacity-100"
      >
        <Image
          src={'github.svg'}
          alt="github"
          width={30}
          height={30}
        />
        <span className="text-white">깃허브로 로그인</span>
      </button>
      <button
        onClick={handleKakaoLogin}
        className="flex h-50pxr w-240pxr items-center justify-center gap-8 rounded-sm bg-[#fdd801] opacity-70 hover:opacity-100"
      >
        <Image
          src={'kakao.svg'}
          alt="github"
          width={30}
          height={30}
        />
        <span>카카오로 로그인</span>
      </button>
    </section>
  );
};

export default Signin;
