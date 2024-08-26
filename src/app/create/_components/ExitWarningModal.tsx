import Modal from '@/app/_components/Modal';

interface ExitWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackBtnClick: () => void;
  onStayBtnClick: () => void;
}

const ExitWarningModal = ({
  isOpen,
  onClose,
  onBackBtnClick,
  onStayBtnClick,
}: ExitWarningModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      rounded="3xl"
      width="100"
    >
      <div className="p-15pxr text-center text-sm">
        <p className="my-20pxr text-base font-bold">안내</p>
        <span>페이지를 나가면 작성중인 내용이 사라집니다.</span>
        <div className="mt-40pxr grid w-full grid-cols-2 gap-2">
          <button
            className="rounded-xl bg-gray-200 py-10pxr"
            onClick={onBackBtnClick}
          >
            나가기
          </button>
          <button
            className="rounded-xl bg-main-1 py-10pxr text-white"
            onClick={onStayBtnClick}
          >
            계속 작성하기
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitWarningModal;
