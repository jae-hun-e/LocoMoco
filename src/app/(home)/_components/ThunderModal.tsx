import Modal from '@/app/_components/Modal';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useThunderModalStore } from '@/store/thunderModalStore';

const ThunderModal = () => {
  const isOpen = useThunderModalStore((state) => state.isOpen);
  const closeModal = useThunderModalStore((state) => state.closeModal);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
      >
        <div>
          <CardHeader>
            <CardTitle>⚡️번개 모각코를 생성해요!</CardTitle>
            <CardDescription>생성 즉시 모각코가 시작됩니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Modal 내용입니다.(form 들어갈 예정)</p>
          </CardContent>
        </div>
      </Modal>
    </>
  );
};

export default ThunderModal;
