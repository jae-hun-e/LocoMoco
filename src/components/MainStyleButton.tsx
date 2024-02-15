import { cn } from '@/libs/utils';

interface Props {
  content: string;
  className?: string;
}
const MainStyleButton = ({ content, className }: Props) => {
  return (
    <button
      className={cn(
        'flex h-full flex-grow items-center justify-center rounded-xl bg-main-1 text-layer-1 hover:bg-hover',
        className,
      )}
    >
      <p>{content}</p>
    </button>
  );
};

export default MainStyleButton;
