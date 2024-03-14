import { useId } from 'react';
import { TagType } from '@/apis/mgc/queryFn';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/libs/utils';

interface Props {
  title: string;
  checkBoxList: TagType[];
  onSelected: (checked: TagType) => void;
  onDeselected: (checked: number) => void;
  className?: string;
  initCheckedList?: string[];
}

const CheckboxGroup = ({
  title,
  checkBoxList,
  className,
  onSelected,
  onDeselected,
  initCheckedList,
}: Props) => {
  const uniqueId = useId();

  return (
    <>
      <Label className=" w-100pxr flex-shrink-0">{title}</Label>
      <div className={cn('flex flex-wrap justify-around', className)}>
        {checkBoxList.map(({ tag_id, tag_name }) => (
          <div
            key={`${uniqueId}-${tag_id}`}
            className="flex items-center gap-1"
          >
            <Checkbox
              id={`${uniqueId}-${tag_name}`}
              onCheckedChange={(checked) =>
                checked ? onSelected({ tag_id, tag_name }) : onDeselected(tag_id)
              }
              checked={initCheckedList && initCheckedList.includes(tag_name)}
            />
            <label
              htmlFor={`${uniqueId}-${tag_name}`}
              className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag_name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
export default CheckboxGroup;
