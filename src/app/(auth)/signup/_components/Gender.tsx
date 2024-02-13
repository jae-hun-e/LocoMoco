import Radio from '@/app/_components/Radio';
import RadioGroup from '@/app/_components/RadioGroup';

interface Props {
  gender: string;
  setGender: (gender: string) => void;
}

const Gender = ({ gender, setGender }: Props) => {
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
export default Gender;
