import MGCListItem from '@/app/_components/MGCList/MGCListItem';
import { Separator } from '@/components/ui/separator';
import { MGCSummary } from '@/types/MGCList';

interface MGCListPropsType {
  data: MGCSummary[];
}

const MGCList = ({ data }: MGCListPropsType) => {
  if (data.length !== 0) {
    return (
      <div>
        {data.map((mgc) => {
          return (
            <div key={mgc.id}>
              <MGCListItem data={mgc}></MGCListItem>
              <Separator></Separator>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <div>검색 결과에 해당하는 모각코가 없습니다!</div>;
  }
};

export default MGCList;
