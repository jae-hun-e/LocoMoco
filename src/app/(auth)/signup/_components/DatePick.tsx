import 'react-day-picker/dist/style.css';

interface Props {
  setDaySelected: (date: string) => void;
}

const DatePick = ({ setDaySelected }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h3>생년월일</h3>
      <div className="relative flex h-10 items-center gap-1 rounded-md border p-2">
        <input
          type="date"
          onChange={(e) => setDaySelected(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DatePick;
