import { UseFormSetValue } from 'react-hook-form';
import { TagType } from '@/apis/mgc/queryFn';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UserProfile } from '@/types/userInfo';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  setJob: UseFormSetValue<UserProfile>;
}

const Job = ({ setJob }: Props) => {
  const queryClient = useQueryClient();
  const categoryList = queryClient.getQueryData(getCategoryOptions().queryKey);
  const tags = categoryList?.find(({ category_name }) => category_name === '직업')?.tags;

  16;
  const handleRadioSelect = (
    field: keyof UserProfile['requestDto'],
    selected: string,
    tags: TagType[],
  ) => {
    const selectTag = tags.filter(({ tag_name }) => tag_name === selected);
    selectTag && setJob(`requestDto.${field}`, selectTag[0].tag_id);
  };

  return (
    <div className="flex flex-col gap-1">
      <h2>직업</h2>
      {tags && (
        <RadioGroup
          className="flex"
          defaultValue="취준생"
          onValueChange={(value) => handleRadioSelect('jobId', value, tags)}
        >
          {tags.map(({ tag_name, tag_id }) => (
            <div
              className="flex items-center space-x-2"
              key={tag_id}
            >
              <RadioGroupItem
                value={tag_name}
                id={tag_name}
              />
              <Label
                htmlFor={tag_name}
                className="text-xs"
              >
                {tag_name}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  );
};
export default Job;
