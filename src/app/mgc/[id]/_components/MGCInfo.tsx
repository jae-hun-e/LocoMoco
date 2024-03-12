import { LocationInfo } from '@/apis/mgc/queryFn';
import MGCOptions from '@/app/mgc/[id]/_components/MGCOptions';
import StaticMap from '@/app/mgc/[id]/_components/StaticMap';
import { format } from 'date-fns';

interface Props {
  title: string;
  location: LocationInfo;
  startTime: string;
  endTime: string;

  content?: string;
  tagIds?: number[];
}

const MGCInfo = ({ title, location, startTime, endTime, content, tagIds }: Props) => {
  return (
    <section>
      <p className="my-20pxr text-lg font-bold">{title}</p>
      <section className="mb-10pxr">
        <p>날짜: {format(startTime, 'yyyy. MM. dd')}</p>
        <p>
          시간: {format(startTime, ' HH:mm')} ~ {format(endTime, 'HH:mm')}
        </p>
      </section>

      <section className="mb-30pxr">
        <MGCOptions tagIds={tagIds} />
      </section>

      <section className="mb-10pxr">
        <p>{content ?? '내용 없음'}</p>
        <StaticMap location={location} />
      </section>
    </section>
  );
};

export default MGCInfo;
