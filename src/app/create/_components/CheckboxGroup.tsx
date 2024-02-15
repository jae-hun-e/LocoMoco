import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/libs/utils';

interface Props {
  checkBoxList: { id: number; value: string }[];
  onSelected: (checked: string) => void;
  onDeselected: (checked: string) => void;
  className?: string;
}
const CheckboxGroup = ({ checkBoxList, className, onSelected, onDeselected }: Props) => {
  return (
    <div className={cn('flex flex-wrap justify-between', className)}>
      {checkBoxList.map(({ id, value }) => (
        <div
          key={id}
          className="flex items-center gap-1"
        >
          <Checkbox
            id={value}
            onCheckedChange={(checked) => (checked ? onSelected(value) : onDeselected(value))}
          />
          <label
            htmlFor={value}
            className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {value}
          </label>
        </div>
      ))}
    </div>
  );
};
export default CheckboxGroup;
