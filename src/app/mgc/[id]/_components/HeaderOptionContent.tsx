import { useDeleteMGC } from '@/apis/mgc/useDeleteMGC';

const HeaderOptionContent = ({ isOwner }: { isOwner: boolean }) => {
  const title = isOwner ? '삭제' : '신고';

  const { mutate: deleteMGC } = useDeleteMGC();

  const MGCId = window.location.pathname.split('/').at(-1);

  const handleClick = () => {
    if (isOwner) {
      if (confirm('삭제하시겠습니까? 삭제된 모각코는 다시 돌릴 수 없습니다.') && MGCId) {
        deleteMGC(MGCId);
      }
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};

export default HeaderOptionContent;
