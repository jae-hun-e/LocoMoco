'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DatePick from './components/DatePick';
import Job from './components/Job';
import NickName from './components/Nickname';
import Sex from './components/Sex';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [daySelected, setDaySelected] = useState<string>('');
  const [gender, setGender] = useState('남');
  const [job, setJob] = useState('현직자');

  const handleSubmit = () => {
    console.log(nickname, daySelected, gender, job);
    // Todo: API 연결시 백엔드로 보내기
  };

  return (
    <section className="flex flex-col justify-center gap-8 p-8">
      <h2 className="w-full text-center text-xl font-bold">회원가입</h2>
      <NickName setNickname={setNickname} />
      <DatePick setDaySelected={setDaySelected} />
      <Sex
        gender={gender}
        setGender={setGender}
      />
      <Job
        job={job}
        setJob={setJob}
      />
      <Button
        onClick={handleSubmit}
        className="bg-main-1"
      >
        완료
      </Button>
    </section>
  );
};

export default Signup;
