'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import DatePick from '../_components/DatePick';
import Gender from '../_components/Gender';
import Job from '../_components/Job';
import NickName from '../_components/Nickname';
import Warning from '../_components/Warning';

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

  const [isDuplicated, setIsDuplicated] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      alert('잘못된 접근입니다. 홈으로 돌아갑니다');
      sessionStorage.clear();
      router.replace('/');
    }
    addEventListener('beforeunload', () => {
      sessionStorage.clear();
    });
    return () =>
      removeEventListener('beforeunload', () => {
        sessionStorage.clear();
      });
  }, [router]);

  const onSubmit = useCallback(async () => {
    const valid = await trigger();
    if (!valid) return;
    if (isDuplicated) {
      alert('닉네임 중복체크를 해주세요');
      return;
    }
    const token = sessionStorage.getItem(`token`);
    const userId = sessionStorage.getItem('userId');
    if (!token || !userId) return;
    client
      .put({
        url: `/users/init/${userId}`,
        headers: {
          Authorization: token,
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
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('provider', method.toUpperCase());
        sessionStorage.clear();
        router.replace('/');
      })
      .catch((error) => alert(error));
  }, [getValues, isDuplicated, method, router, trigger]);

  return (
    <section className="flex flex-col justify-center gap-8 p-6">
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
    </section>
  );
};

export default Signup;
