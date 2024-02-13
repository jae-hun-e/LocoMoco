import Radio from '@/app/_components/Radio';
import RadioGroup from '@/app/_components/RadioGroup';

interface Props {
  job: string;
  setJob: (job: string) => void;
}

const Job = ({ job, setJob }: Props) => {
  return (
    <RadioGroup label="직업">
      <Radio
        selected={job}
        setSelected={setJob}
        value="worker"
      >
        현직자
      </Radio>
      <Radio
        selected={job}
        setSelected={setJob}
        value="ready"
      >
        취준생
      </Radio>
      <Radio
        selected={job}
        setSelected={setJob}
        value="etc"
      >
        기타
      </Radio>
    </RadioGroup>
  );
};
export default Job;
