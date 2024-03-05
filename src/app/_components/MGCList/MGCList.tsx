import MGCListItem from '@/app/_components/MGCList/MGCListItem';
import { Separator } from '@/components/ui/separator';
import { MGCSummary } from '@/types/MGCList';

interface MGCListPropsType {
  data: MGCSummary[];
}

const MGCList = ({ data }: MGCListPropsType) => {
  return (
    <div>
      {data.map((mgc, idx) => {
        return (
          <div key={idx}>
            <MGCListItem data={mgc}></MGCListItem>
            <Separator></Separator>
          </div>
        );
      })}
    </div>
  );
};

export default MGCList;
