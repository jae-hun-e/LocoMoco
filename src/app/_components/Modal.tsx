import { Card } from '@/components/ui/card';

// import useClickAway from '@/hooks/useClickaway';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  // Todo: hook 써서 외부 영역 클릭 시 모달 안보이게 [2024/2/27]

  // const modalContentRef = useClickAway((e: MouseEvent | TouchEvent) => {
  //   onClose();
  //   const target = e.target as HTMLDivElement;
  //   console.log(target);
  //   if (!target.closest('#modal-content')) {
  //     //모달 외부 클릭 로직
  //     console.log(target);
  //     onClose();
  //   }
  //   onClose();
  // });

  return (
    <>
      {isOpen && (
        <div
          // ref={modalContentRef}
          onClick={onClose}
          className="fixed inset-0 left-0 right-0 top-0 z-50 flex h-[100svh] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/75"
        >
          <Card
            id="modal-content"
            onClick={(e) => e.stopPropagation()}
            className="z-100 relative w-310pxr rounded-lg opacity-100 shadow"
          >
            {children}
          </Card>
        </div>
      )}
    </>
  );
};

export default Modal;
