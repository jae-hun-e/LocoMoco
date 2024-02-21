import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Props {
  setJob: (job: string) => void;
}

const Job = ({ setJob }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2>직업</h2>
      <RadioGroup
        className="flex"
        defaultValue="developer"
        onValueChange={(job) => setJob(job)}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="developer"
            id="developer"
          />
          <Label htmlFor="worker">현직자</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="job_seeker"
            id="job_seeker"
          />
          <Label htmlFor="ready">취준생</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem
            value="etc"
            id="etc"
          />
          <Label htmlFor="etc">기타</Label>
        </div>
      </RadioGroup>
    </div>
  );
};
export default Job;
