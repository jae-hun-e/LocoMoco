import { ChangeEvent } from 'react';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Props {
  nickname: string;
  isEmpty: Array<boolean>;
  setNickname: (nickname: string) => void;
  setIsEmpty: (isEmpty: Array<boolean>) => void;
  setIsValidNickname: (isValidNickname: boolean) => void;
  setNicknameWarningText: (nicknameWarningText: string) => void;
}

const NickName = ({
  nickname,
  isEmpty,
  setNickname,
  setIsEmpty,
  setIsValidNickname,
  setNicknameWarningText,
}: Props) => {
  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setIsValidNickname(true);
    setIsEmpty([false, isEmpty[1]]);
    setNicknameWarningText('');
  };

  const checkDuplication = () => {
    if (nickname === '') {
      setNicknameWarningText('닉네임을 입력해주세요.');
      setIsValidNickname(false);
      return;
    }
    client.get({ url: `users/nickname/${nickname}/check` }).then((res) => {
      if (!res) {
        setNicknameWarningText('중복된 닉네임입니다.');
        setIsValidNickname(false);
      } else {
        setNicknameWarningText('사용가능한 닉네임입니다.');
        setIsValidNickname(true);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <h3>닉네임</h3>
      <div className="flex justify-between gap-1">
        <div className="flex w-full flex-col">
          <Input
            className="flex w-full"
            onChange={handleNickname}
            placeholder="닉네임을 입력해주세요."
          />
        </div>
        <Button
          className="bg-main-1"
          onClick={checkDuplication}
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default NickName;
