import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistance, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';

interface Props {
  author: string;
  hits: number;
}
const AuthorInfo = ({ author, hits }: Props) => {
  return (
    <section className="my-10pxr flex gap-11pxr">
      <Avatar className="h-32pxr w-32pxr rounded-full ">
        <AvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <AvatarFallback>
          <Image
            src={'/oh.png'}
            alt={'cn'}
            width={32}
            height={32}
          />
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col gap-3pxr">
        <p>{author}</p>
        <p className="font-extralight">
          {formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true, locale: ko })} ·
          조회 {hits}
        </p>
      </div>
    </section>
  );
};

export default AuthorInfo;
