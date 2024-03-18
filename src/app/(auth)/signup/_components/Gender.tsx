import { UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserProfile } from '@/types/userInfo';

interface Props {
  setGender: UseFormSetValue<UserProfile>;
}

const gender = [
  { value: 'male', label: '남' },
  { value: 'female', label: '여' },
];

const Gender = ({ setGender }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>성별</h2>
      <RadioGroup
        className="flex"
        defaultValue="male"
        onValueChange={(gender) => setGender('requestDto.gender', gender)}
      >
        {gender.map(({ value, label }) => (
          <div
            className="flex items-center space-x-2"
            key={value}
          >
            <RadioGroupItem
              value={value}
              id={value}
            />
            <Label htmlFor={value}>{label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export default Gender;
