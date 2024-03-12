import { Report } from '@/types/report';
import { Separator } from '@radix-ui/react-separator';
import ReportListItem from './ReportListItem';

interface ReportListProps {
  data: Report[];
  onModifyBtnClick: (id: number) => void;
  onDeleteBtnClick: (id: number) => void;
}

const ReportList = ({ data, onModifyBtnClick, onDeleteBtnClick }: ReportListProps) => {
  return (
    <section>
      <ul>
        {data.map((el) => (
          <div key={el.reportId}>
            <ReportListItem
              data={el}
              onModifyBtnClick={onModifyBtnClick}
              onDeleteBtnClick={onDeleteBtnClick}
            />
            <Separator />
          </div>
        ))}
      </ul>
    </section>
  );
};

export default ReportList;
