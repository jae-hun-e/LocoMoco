import { UseFormSetValue } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { SignupValue } from '../[method]/page';

interface Props {
  setJob: UseFormSetValue<SignupValue>;
}

const job = [
  { value: 'developer', label: '현직자' },
  { value: 'job_seeker', label: '취준생' },
  { value: 'etc', label: '기타' },
];

const Job = ({ setJob }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>직업</h2>
      <RadioGroup
        className="flex"
        defaultValue="developer"
        onValueChange={(job) => setJob('job', job)}
      >
        {job.map(({ value, label }) => (
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
export default Job;
