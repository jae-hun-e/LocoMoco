'use client';

import { useEffect } from 'react';
import client from '@/apis/core';
import { useRouter, useSearchParams } from 'next/navigation';
import ProgressBar from '../../signup/_components/ProgressBar';

interface ResponseType {
  isNewUser: boolean;
  tokenResponseDto: {
    token_type: string;
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_token_expires_in: number;
  };
  userInfoDto: {
    birth: null | string;
    email: string;
    gender: null | 'male' | 'female';
    job: null | 'worker' | 'ready' | 'etc';
    nickname: null | string;
    provider: 'Github' | 'Kakao';
    temperature: number;
    userId: number;
  };
}

const Redirect = ({ params: { method } }: { params: { method: string } }) => {
  const code = useSearchParams().get('code');
  const router = useRouter();

  useEffect(() => {
    const kakaoToken = localStorage.getItem('kakao_token');
    const githubToken = localStorage.getItem('github_token');
    if (kakaoToken || githubToken) {
      alert('잘못된 접근입니다. 홈으로 돌아갑니다');
      sessionStorage.clear();
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    client
      .get<ResponseType>({
        url: `users/login/${method}/callback?code=${code}`,
      })
      .then(({ tokenResponseDto: { access_token }, userInfoDto: { nickname, userId } }) => {
        if (!nickname) {
          sessionStorage.setItem(`${method}_token`, access_token);
          sessionStorage.setItem(`userId`, userId.toString());
          router.replace(`/signup/${method}`);
        } else {
          localStorage.setItem(`${method}_token`, access_token);
          localStorage.setItem(`userId`, userId.toString());
          router.replace('/');
        }
      });
  }, [code, method, router]);

  return (
    <div className="flex h-svh flex-col justify-center">
      <p className="">Redirecting...</p>
      <ProgressBar />
    </div>
  );
};

export default Redirect;
