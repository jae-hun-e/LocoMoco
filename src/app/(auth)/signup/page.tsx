'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import DatePick from './_components/DatePick';
import Gender from './_components/Gender';
import Job from './_components/Job';
import NickName from './_components/Nickname';

// import Sex from './_components/Gender';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [daySelected, setDaySelected] = useState('');
  const [gender, setGender] = useState('male');
  const [job, setJob] = useState('worker');

  const handleSubmit = () => {
    console.log(nickname, daySelected, gender, job);
    // Todo: API 연결시 백엔드로 보내기
  };

  return (
    <section className="flex flex-col justify-center gap-8 p-8">
      <h2 className="w-full text-center text-xl font-bold">회원가입</h2>
      <NickName setNickname={setNickname} />
      <DatePick setDaySelected={setDaySelected} />
      <Gender
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
