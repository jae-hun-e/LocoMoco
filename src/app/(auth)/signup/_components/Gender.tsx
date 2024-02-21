import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  setGender: (gender: string) => void;
}

const Gender = ({ setGender }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>성별</h2>
      <RadioGroup
        className="flex"
        defaultValue="male"
        onValueChange={(gender) => setGender(gender)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="male"
            id="male"
          />
          <Label htmlFor="male">남</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="female"
            id="female"
          />
          <Label htmlFor="female">여</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
export default Gender;
