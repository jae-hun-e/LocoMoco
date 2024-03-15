import { ChangeEvent } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { UserProfile } from '@/types/userInfo';
import { format } from 'date-fns';

interface Props {
  register: UseFormRegister<UserProfile>;
  setDate: UseFormSetValue<UserProfile>;
  defaultValue?: string;
  className?: string;
}

const DatePick = ({ register, setDate, defaultValue, className }: Props) => {
  return (
    <Label className="flex flex-col gap-1 ">
      <p className={className}>생년월일</p>
      <div className="relative flex h-10 items-center gap-1 rounded-md border p-2">
        <input
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          {...register('requestDto.birth', {
            required: true,
            min: 1,
            validate: {
              lessThanToday: (date) => new Date(date) < new Date(),
            },
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setDate('requestDto.birth', e.target.value),
          })}
          defaultValue={defaultValue && format(new Date(defaultValue), 'yyyy-MM-dd')}
        />
      </div>
    </Label>
  );
};

export default DatePick;
