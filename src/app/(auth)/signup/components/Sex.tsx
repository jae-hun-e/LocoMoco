import Radio from '@/components/Radio';
import RadioGroup from '@/components/RadioGroup';

interface Props {
  gender: string;
  setGender: (gender: string) => void;
}
const Sex = ({ gender, setGender }: Props) => {
  return (
    <RadioGroup label="성별">
      <Radio
        selected={gender}
        setSelected={setGender}
        value="male"
      >
        남
      </Radio>
      <Radio
        selected={gender}
        setSelected={setGender}
        value="female"
      >
        여
      </Radio>
    </RadioGroup>
  );
};
export default Sex;
