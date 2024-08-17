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
import { UserProfile } from '@/types/userInfo';

interface Props {
  register: UseFormRegister<UserProfile>;
  setNickname: UseFormSetValue<UserProfile>;
  getNickname: UseFormGetValues<UserProfile>;
  trigger: UseFormTrigger<UserProfile>;
  isValid: boolean;
  setIsDuplicated: (isDuplicated: boolean) => void;
  setDuplicateWarning: (text: string) => void;
  setIsValid: (isDuplicated: boolean) => void;
  setValidationWarning: (text: string) => void;
  defaultValue?: string;
  className?: string;
}

const NickName = ({
  register,
  setNickname,
  getNickname,
  trigger,
  isValid,
  setIsDuplicated,
  setDuplicateWarning,
  setIsValid,
  setValidationWarning,
  defaultValue,
  className,
}: Props) => {
  const checkDuplication = async () => {
    const valid = await trigger('requestDto.nickname');
    if (!valid) return;
    client
      .get({ url: `users/nickname/${getNickname('requestDto.nickname')}/check` })
      .then((res) => {
        if (!res) {
          setDuplicateWarning('중복된 닉네임입니다.');
          setIsDuplicated(true);
        } else {
          setDuplicateWarning('사용가능한 닉네임입니다.');
          setIsDuplicated(false);
        }
      });
  };

  const checkNicknameValidation = async (nickname: string) => {
    const regex = /[^\p{L}\p{N}]/u;
    if (regex.test(nickname)) {
      setValidationWarning('특수기호는 포함할 수 없습니다.');
      setIsValid(false);
    } else if (nickname.length > 20) {
      setValidationWarning('닉네임의 길이는 20자를 넘을 수 없습니다.');
      setIsValid(false);
    } else setIsValid(true);
  };

  return (
    <div className="flex flex-col gap-1">
      <p className={className}>닉네임</p>
      <div className="flex justify-between gap-1">
        <div className="flex w-full flex-col">
          <Input
            className="flex w-full"
            {...register('requestDto.nickname', {
              required: true,
              min: 1,
              onChange: (e: ChangeEvent<HTMLInputElement>) => {
                checkNicknameValidation(e.target.value);
                setNickname('requestDto.nickname', e.target.value);
                setDuplicateWarning('');
                setIsDuplicated(true);
              },
            })}
            placeholder="닉네임을 입력해주세요."
            defaultValue={defaultValue}
          />
        </div>
        <Button
          disabled={!isValid}
          className="bg-main-1"
          onClick={checkDuplication}
          type="button"
        >
          중복 확인
        </Button>
      </div>
    </div>
  );
};

export default NickName;
