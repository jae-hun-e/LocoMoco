'use client';

import { useCallback, useEffect, useState } from 'react';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { redirect, useSearchParams } from 'next/navigation';
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

const Signup = ({ params: { method } }: { params: { method: string } }) => {
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('male');
  const [job, setJob] = useState('developer');
  const [isEmpty, setIsEmpty] = useState([false, false]);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidDate, setIsValidDate] = useState(false);
  const [nicknameWarningText, setNicknameWarningText] = useState('');
  const [dateWarningText, setDateWarningText] = useState('');
  const code = useSearchParams().get('code');

  useEffect(() => {
    const register = () => {
      client.get({ url: `users/login/${method}/callback?code=${code}` }).then((res) => {
        const typeRes = res as ResponseType;
        const token = typeRes.tokenResponseDto.access_token;
        const { userId } = typeRes.userInfoDto;
        localStorage.setItem('userId', userId.toString());
        sessionStorage.setItem(`${method}_token`, token);
      });
    };

    if (localStorage.getItem(`${method}_token`)) redirect('/');
    else {
      if (!sessionStorage.getItem(`${method}_token`)) register();
    }
    setLoading(false);
  }, [code, method]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return (e.returnValue = '');
    };
    addEventListener('beforeunload', handleBeforeUnload, { capture: true });
    return () => removeEventListener('beforeunload', handleBeforeUnload);
  }, [method]);

  const handleSubmit = useCallback(() => {
    if (nickname === '' || birth === '') {
      setIsEmpty([nickname === '', birth === '']);
      setNicknameWarningText('닉네임을 입력해주세요');
      setDateWarningText('생년월일을 입력해주세요');
      return;
    }

    if (!isValidNickname) {
      setIsValidNickname(false);
      setNicknameWarningText('사용 불가능한 닉네임입니다');
      return;
    }

    if (!isValidDate) {
      setIsValidDate(false);
      setDateWarningText('유효하지 않은 날짜입니다');
      return;
    }
    const token = sessionStorage.getItem(`${method}_token`);
    if (!token) return;
    client
      .put({
        url: `/users/init/${sessionStorage.getItem('userId')}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          nickname,
          birth,
          gender,
          job,
        },
      })
      .then(() => {
        alert('회원가입 성공');
        redirect('/');
      })
      .catch((error) => alert(error));
    localStorage.setItem(`${method}_token`, token);
  }, [birth, gender, isValidDate, isValidNickname, job, method, nickname]);

  return (
    <section className="flex flex-col justify-center gap-8 p-6">
      {!loading ? (
        <>
          <h2 className="mt-8 w-full text-center text-xl font-bold">회원가입</h2>
          <div className="relative">
            <NickName
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
              nickname={nickname}
              setNickname={setNickname}
              setIsValidNickname={setIsValidNickname}
              setNicknameWarningText={setNicknameWarningText}
            />
            <Warning good={!(isEmpty[0] || !isValidNickname)}>{nicknameWarningText}</Warning>
          </div>
          <div className="relative">
            <DatePick
              isEmpty={isEmpty}
              setIsEmpty={setIsEmpty}
              setBirth={setBirth}
              setIsValidDate={setIsValidDate}
              setDateWarningText={setDateWarningText}
            />
            <Warning good={!(isEmpty[1] || !isValidDate)}>{dateWarningText}</Warning>
          </div>
          <Gender setGender={setGender} />
          <Job setJob={setJob} />
          <Button
            onClick={handleSubmit}
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
