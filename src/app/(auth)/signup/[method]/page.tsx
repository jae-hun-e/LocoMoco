'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { useRequestPermission } from '@/hooks/useRequestPermission';
import { UserProfile } from '@/types/userInfo';
import { clearItem, getItem, setItem } from '@/utils/storage';
import { useRouter } from 'next/navigation';
import DatePick from '../_components/DatePick';
import Gender from '../_components/Gender';
import Job from '../_components/Job';
import NickName from '../_components/Nickname';
import Warning from '../_components/Warning';

const Signup = ({ params: { method } }: { params: { method: string } }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<UserProfile>({
    defaultValues: {
      requestDto: {
        nickname: '',
        birth: '',
        gender: 'male',
        jobId: 244,
      },
      file: null,
    },
  });

  const [isDuplicated, setIsDuplicated] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState('');
  const router = useRouter();

  const { requestPermission } = useRequestPermission();

  useEffect(() => {
    const token = getItem(localStorage, 'token');
    const tempToken = getItem(sessionStorage, 'token');
    if (token) {
      alert('잘못된 접근입니다. 홈으로 돌아갑니다');
      clearItem(sessionStorage);
      router.replace('/');
    } else if (!tempToken) {
      alert('인증이 만료되었습니다. 다시 시도해주세요');
      router.replace('/signin');
    }
    addEventListener('beforeunload', () => {
      clearItem(sessionStorage);
    });
    return () =>
      removeEventListener('beforeunload', () => {
        clearItem(sessionStorage);
      });
  }, [router]);

  const onSubmit = useCallback(async () => {
    const valid = await trigger();
    if (!valid) return;
    if (isDuplicated) {
      alert('닉네임 중복체크를 해주세요');
      return;
    }

    const token = getItem<string | undefined>(sessionStorage, `token`);
    const userId = getItem<string | undefined>(sessionStorage, 'userId');
    if (!token || !userId) return;

    const userProfile = new FormData();
    userProfile.append('requestDto', JSON.stringify(getValues('requestDto')));
    client
      .put({
        url: `/users/init/${userId}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: userProfile,
      })
      .then(() => {
        alert('회원가입 성공');
        setItem(localStorage, 'token', token);
        setItem(localStorage, 'userId', userId);
        setItem(localStorage, 'provider', method.toUpperCase());
        clearItem(sessionStorage);
        // TODO: 푸시 알림 권한 요청 진입점 다시 생각해야함(현재는 회원가입한 디바이스만 저장하게 됨)[24/03/19]
        requestPermission({ userId });
        // router.replace('/');
      })
      .catch(alert);
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
        {errors.requestDto?.nickname && <Warning good={false}>닉네임을 입력해주세요</Warning>}
        {!errors.requestDto?.nickname && <Warning good={!isDuplicated}>{duplicateWarning}</Warning>}
      </div>
      <div className="relative">
        <DatePick
          register={register}
          setDate={setValue}
        />
        <Warning good={!errors.requestDto?.birth}>
          {errors.requestDto?.birth && '올바른 날짜를 입력해주세요'}
        </Warning>
      </div>
      <Gender setGender={setValue} />
      <Job setJob={setValue} />
      <Button
        disabled={isDuplicated}
        onClick={handleSubmit(onSubmit)}
        className="mt-4 bg-main-1"
      >
        완료
      </Button>
    </section>
  );
};

export default Signup;
