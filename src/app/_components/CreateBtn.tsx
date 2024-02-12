import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateBtn = () => {
  const router = useRouter();
  const [isCreateBtnOpen, setIsCreateBtnOpen] = useState(false);

  const handleCreateClick = (type: 'thunder' | 'normal') => {
    if (type === 'thunder') {
      // TODO: 번개 생성 모달 켜지도록 수정하기 [24/02/12]
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
        <Button className="h-50pxr w-50pxr rounded-full bg-main-1 hover:bg-[#39A776]">
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
    </Popover>
  );
};

export default CreateBtn;
