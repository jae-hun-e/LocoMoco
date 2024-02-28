import { ChangeEvent } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import client from '@/apis/core';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SignupValue } from '../[method]/page';

interface Props {
  register: UseFormRegister<SignupValue>;
  setNickname: UseFormSetValue<SignupValue>;
  getNickname: UseFormGetValues<SignupValue>;
  trigger: UseFormTrigger<SignupValue>;
  setIsDuplicated: (isDuplicated: boolean) => void;
  setDuplicateWarning: (text: string) => void;
}

const NickName = ({
  register,
  setNickname,
  getNickname,
  trigger,
  setIsDuplicated,
  setDuplicateWarning,
}: Props) => {
  const checkDuplication = async () => {
    const valid = await trigger('nickname');
    if (!valid) return;
    client.get({ url: `users/nickname/${getNickname('nickname')}/check` }).then((res) => {
      if (!res) {
        setDuplicateWarning('중복된 닉네임입니다.');
        setIsDuplicated(true);
      } else {
        setDuplicateWarning('사용가능한 닉네임입니다.');
        setIsDuplicated(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <h2>닉네임</h2>
      <div className="flex justify-between gap-1">
        <div className="flex w-full flex-col">
          <Input
            className="flex w-full"
            {...register('nickname', {
              required: true,
              min: 1,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                setNickname('nickname', e.target.value);
                setDuplicateWarning('');
                setIsDuplicated(true);
              },
            })}
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
