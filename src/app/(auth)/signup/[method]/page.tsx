'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import DatePick from '../_components/DatePick';
import Gender from '../_components/Gender';
import Job from '../_components/Job';
import NickName from '../_components/Nickname';
import ProgressBar from '../_components/ProgressBar';
import Warning from '../_components/Warning';

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

export interface SignupValue {
  nickname: string;
  birth: string;
  gender: string;
  job: string;
}

const Signup = ({ params: { method } }: { params: { method: string } }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<SignupValue>({
    defaultValues: {
      nickname: '',
      birth: '',
      gender: 'male',
      job: 'developer',
    },
  });

  const [loading, setLoading] = useState(true);
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState('');
  const router = useRouter();
  const code = useSearchParams().get('code');

  useEffect(() => {
    const login = () => {
      client
        .get<ResponseType>({ url: `users/login/${method}/callback?code=${code}` })
        .then((res) => {
          const token = res.tokenResponseDto.access_token;
          const { userId, birth } = res.userInfoDto;
          if (birth) {
            localStorage.setItem('userId', userId.toString());
            localStorage.setItem(`${method}_token`, token);
            router.replace('/');
            return;
          }
          sessionStorage.setItem('userId', userId.toString());
          sessionStorage.setItem(`${method}_token`, token);
        });
    };
    if (localStorage.getItem(`${method}_token`)) router.replace('/');
    else {
      if (!sessionStorage.getItem(`${method}_token`)) login();
    }
    setLoading(false);
  }, [code, method, router]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => removeEventListener('beforeunload', handleBeforeUnload);
  }, [method]);

  const onSubmit = useCallback(async () => {
    const valid = await trigger();
    if (!valid) return;
    if (isDuplicated) {
      alert('닉네임 중복체크를 해주세요');
      return;
    }
    const token = sessionStorage.getItem(`${method}_token`);
    const userId = sessionStorage.getItem('userId');
    if (!token || !userId) return;
    client
      .put({
        url: `/users/init/${userId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          nickname: getValues('nickname'),
          birth: getValues('birth'),
          gender: getValues('gender'),
          job: getValues('job'),
        },
      })
      .then(() => {
        alert('회원가입 성공');
        localStorage.setItem(`${method}_token`, token);
        localStorage.setItem('userId', userId);
        sessionStorage.clear();
        router.replace('/');
      })
      .catch((error) => alert(error));
  }, [getValues, isDuplicated, method, router, trigger]);

  return (
    <section className="flex flex-col justify-center gap-8 p-6">
      {!loading ? (
        <>
          <h2 className="mt-8 w-full text-center text-xl font-bold">회원가입</h2>
          <div className="relative">
            <NickName
              register={register}
              getNickname={getValues}
              setNickname={setValue}
              trigger={trigger}
              setIsDuplicated={setIsDuplicated}
              setDuplicateWarning={setDuplicateWarning}
            />
            {errors.nickname && <Warning good={false}>닉네임을 입력해주세요</Warning>}
            {!errors.nickname && <Warning good={!isDuplicated}>{duplicateWarning}</Warning>}
          </div>
          <div className="relative">
            <DatePick
              register={register}
              getDate={getValues}
              setDate={setValue}
              trigger={trigger}
            />
            <Warning good={!errors.birth}>{errors.birth && '올바른 날짜를 입력해주세요'}</Warning>
          </div>
          <Gender setGender={setValue} />
          <Job setJob={setValue} />
          <Button
            onClick={handleSubmit(onSubmit)}
            className="mt-4 bg-main-1"
          >
            완료
          </Button>
        </>
      ) : (
        <ProgressBar />
      )}
    </section>
  );
};

export default Signup;
