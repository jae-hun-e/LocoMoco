'use client';

import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import DatePick from '@/app/(auth)/signup/_components/DatePick';
import NickName from '@/app/(auth)/signup/_components/Nickname';
import Warning from '@/app/(auth)/signup/_components/Warning';
import { useMypageInfo } from '@/app/mypage/_hooks/useMypageInfo';
import MainStyleButton from '@/components/MainStyleButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { genderType } from '@/constants/userInfo';
import { UserProfile } from '@/types/userInfo';
import { getItem } from '@/utils/storage';
import { CameraIcon } from 'lucide-react';
import Image from 'next/image';

/* TODO : API 필요
1. 개인정보 수정 API 필요
 */
const ChangeMyInfo = () => {
  let userId;
  if (typeof window !== 'undefined') {
    userId = getItem<string | undefined>(localStorage, 'userId');
  }

  const { myInfo } = useMypageInfo({ userId: Number(userId) });
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<UserProfile>();

  // image 임시저장
  const [imageUrl, setImageUrl] = useState('/oh.png');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      const image = window.URL.createObjectURL(file);
      setImageUrl(image);
      setImageFile(file);
    }
  };

  // nickName부분..
  const [isDuplicated, setIsDuplicated] = useState(true);
  const [duplicateWarning, setDuplicateWarning] = useState('');

  const handleRadioSelect = (field: keyof UserProfile['requestDto'], selected: string) => {
    setValue(`requestDto.${field}`, selected);
  };

  const onSubmitPatchMyInfo = (data: UserProfile) => {
    console.log('data', data);
    console.log('imageFile', imageFile);
  };

  if (!myInfo) return <div>로딩중...</div>;

  return (
    <form>
      <section className="flex h-200pxr items-center justify-center">
        <div className="relative">
          <Image
            src={imageUrl}
            alt={'유저 이미지'}
            width={100}
            height={100}
            className="rounded-full"
            priority
          />
          <Label className="absolute bottom-0 right-0">
            <Input
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
            <CameraIcon />
          </Label>
        </div>
      </section>

      <section className="flex flex-col gap-5">
        <section className="relative">
          <NickName
            register={register}
            getNickname={getValues}
            setNickname={setValue}
            trigger={trigger}
            setIsDuplicated={setIsDuplicated}
            setDuplicateWarning={setDuplicateWarning}
            defaultValue={myInfo.userInfo.nickname}
            className="text-xs"
          />
          {errors.requestDto?.nickname && (
            <Warning
              good={false}
              className="text-xs"
            >
              닉네임을 입력해주세요
            </Warning>
          )}
          {!errors.requestDto?.nickname && (
            <Warning
              good={!isDuplicated}
              className="text-xs"
            >
              {duplicateWarning}
            </Warning>
          )}
        </section>

        <Label>
          <p className="mb-2 text-xs">성별</p>
          <RadioGroup
            defaultValue={myInfo.userInfo.gender}
            onValueChange={(value) => handleRadioSelect('gender', value)}
            className="mt-4 flex grow flex-wrap justify-around"
          >
            {genderType.map(({ tag_name, tag_id, value }) => (
              <div
                className="flex items-center space-x-2"
                key={tag_id}
              >
                <RadioGroupItem
                  value={value}
                  id={tag_name}
                />
                <Label
                  htmlFor={tag_name}
                  className="text-xs"
                >
                  {tag_name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Label>

        <Label>
          <p className="mb-2 text-xs">직업</p>
          <RadioGroup
            defaultValue={myInfo.userInfo.job}
            onValueChange={(value) => handleRadioSelect('job', value)}
            className="mt-4 flex grow flex-wrap justify-around"
          >
            {genderType.map(({ tag_name, tag_id, value }) => (
              <div
                className="flex items-center space-x-2"
                key={tag_id}
              >
                <RadioGroupItem
                  value={value}
                  id={tag_name}
                />
                <Label
                  htmlFor={tag_name}
                  className="text-xs"
                >
                  {tag_name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </Label>

        <DatePick
          register={register}
          setDate={setValue}
          defaultValue={myInfo.userInfo.birth}
          className="text-xs"
        />
      </section>

      <div className={'fixed bottom-14 z-50 w-[calc(100%-2.5rem)]'}>
        <MainStyleButton
          content={'수정하기'}
          layout="h-33pxr"
          onClick={handleSubmit(onSubmitPatchMyInfo)}
        />
      </div>
    </form>
  );
};

export default ChangeMyInfo;
