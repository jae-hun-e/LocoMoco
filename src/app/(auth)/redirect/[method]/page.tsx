'use client';

import { useEffect } from 'react';
import client from '@/apis/core';
import ProgressBar from '@/components/ProgressBar';
import { clearItem, getItem, setItem } from '@/utils/storage';
import { useRouter, useSearchParams } from 'next/navigation';

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
    if (getItem(localStorage, 'token')) {
      alert('잘못된 접근입니다. 홈으로 돌아갑니다');
      clearItem(sessionStorage);
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
          setItem(sessionStorage, 'token', access_token);
          setItem(sessionStorage, 'userId', userId.toString());

          router.replace(`/signup/${method}`);
        } else {
          setItem(localStorage, 'token', access_token);
          setItem(localStorage, `userId`, userId.toString());
          setItem(localStorage, 'provider', method.toUpperCase());
          router.replace('/');
        }
      });
  }, [code, method, router]);

  return (
    <div className="flex flex-col justify-center body-height">
      <p className="">Redirecting...</p>
      <ProgressBar />
    </div>
  );
};

export default Redirect;
