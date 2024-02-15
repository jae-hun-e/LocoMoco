import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  setNickname: (nickname: string) => void;
}

const NickName = ({ setNickname }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h3>닉네임</h3>
      <div className="flex gap-1">
        <Input
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요."
        />
        <Button className="bg-main-1">중복 확인</Button>
      </div>
    </div>
  );
};

export default NickName;
