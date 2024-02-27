import React, { useState } from 'react';
import ThunderModal from '@/app/(home)/_components/ThunderModal/ThunderModal';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useThunderModalStore } from '@/store/thunderModalStore';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateBtn = () => {
  const router = useRouter();
  const [isCreateBtnOpen, setIsCreateBtnOpen] = useState(false);
  const { toggleModal } = useThunderModalStore();

  const handleCreateClick = (type: 'thunder' | 'normal') => {
    if (type === 'thunder') {
      toggleModal();
    } else {
      router.push('/create');
    }
  };

  return (
    <Popover
      onOpenChange={(open) => {
        setIsCreateBtnOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button className="h-50pxr w-50pxr rounded-full bg-main-1 hover:bg-hover">
          <Plus
            className={`lucide lucide-plus ${isCreateBtnOpen ? 'rotate-45' : 'rotate-0'} transition`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto border-0 bg-transparent p-10pxr text-sm shadow-none">
        {/* TODO: 추후 디자인 논의 후 변경 [24/02/12] */}
        <div className="flex flex-col gap-2 text-right">
          <Button
            className="cursor-pointer"
            onClick={() => handleCreateClick('thunder')}
          >
            ⚡번개 모각코
          </Button>
          <Button
            className="cursor-pointer"
            onClick={() => handleCreateClick('normal')}
          >
            모각코
          </Button>
        </div>
      </PopoverContent>
      <ThunderModal />
    </Popover>
  );
};

export default CreateBtn;
