import { ChangeEvent } from 'react';
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import { format } from 'date-fns';
import { SignupValue } from '../[method]/page';

interface Props {
  register: UseFormRegister<SignupValue>;
  setDate: UseFormSetValue<SignupValue>;
  getDate: UseFormGetValues<SignupValue>;
  trigger: UseFormTrigger<SignupValue>;
}

const DatePick = ({ register, setDate }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>생년월일</h2>
      <div className="relative flex h-10 items-center gap-1 rounded-md border p-2">
        <input
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          {...register('birth', {
            required: true,
            min: 1,
            validate: {
              lessThanToday: (date) => new Date(date) < new Date(),
            },
            onChange: (e: ChangeEvent<HTMLInputElement>) => setDate('birth', e.target.value),
          })}
        />
      </div>
    </div>
  );
};

export default DatePick;
