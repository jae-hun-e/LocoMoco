import { ChangeEvent } from 'react';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

interface Props {
  isEmpty: Array<boolean>;
  setIsEmpty: (isEmpty: Array<boolean>) => void;
  setBirth: (date: string) => void;
  setIsValidDate: (isValidDate: boolean) => void;
  setDateWarningText: (dateWarningText: string) => void;
}

const DatePick = ({ isEmpty, setIsEmpty, setBirth, setIsValidDate, setDateWarningText }: Props) => {
  const handleDate = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    const today = new Date();
    if (selectedDate > today) {
      setDateWarningText('유효하지 않은 날짜입니다.');
      setIsValidDate(false);
      return;
    }
    setIsValidDate(true);
    setDateWarningText('');
    setBirth(e.target.value);
    setIsEmpty([isEmpty[0], false]);
  };

  return (
    <div className="flex flex-col gap-1">
      <h3>생년월일</h3>
      <div className="relative flex h-10 items-center gap-1 rounded-md border p-2">
        <input
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          onChange={handleDate}
        />
      </div>
    </div>
  );
};

export default DatePick;
