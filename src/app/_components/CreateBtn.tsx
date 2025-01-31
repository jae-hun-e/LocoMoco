import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import useA2HS from '@/hooks/useA2HS';
import useClickAway from '@/hooks/useClickaway';
import { useThunderModalStore } from '@/store/thunderModalStore';
import { getItem } from '@/utils/storage';
import { LockKeyhole, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import A2HS from './A2HS';

const CreateBtn = () => {
  let token: string | undefined;
  if (typeof window !== 'undefined') token = getItem<string | undefined>(localStorage, 'token');

  const router = useRouter();
  const [isCreateBtnOpen, setIsCreateBtnOpen] = useState(false);
  const { isOpen, toggleModal } = useThunderModalStore();
  const { installApp } = useA2HS();

  const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsCreateBtnOpen(false));

  const handleCreateClick = (type: 'thunder' | 'normal') => {
    if (type === 'thunder') {
      toggleModal();
    } else {
      router.push('/create');
    }
  };

  const handleButtonClick = () => {
    setIsCreateBtnOpen(isCreateBtnOpen ? false : true);
    if (token === undefined) {
      router.push('/signin');
    }
  };

  useEffect(() => {
    if (isOpen) {
      setIsCreateBtnOpen(false);
    }
  }, [isOpen]);
  return (
    <div ref={clickAwayRef}>
      <Popover open={isCreateBtnOpen}>
        <PopoverTrigger asChild>
          <Button
            onClick={handleButtonClick}
            role="button"
            className="h-50pxr w-50pxr rounded-full bg-main-1 hover:bg-hover"
          >
            {token ? (
              <Plus
                className={`lucide lucide-plus ${isCreateBtnOpen ? 'rotate-45' : 'rotate-0'} transition`}
              />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <LockKeyhole />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Login</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </Button>
        </PopoverTrigger>
        {token && (
          <PopoverContent className="w-auto border-0 bg-transparent p-10pxr text-sm shadow-none">
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
              <Button
                className="cursor-pointer"
                onClick={installApp}
              >
                앱 설치
              </Button>
              <A2HS />
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export default CreateBtn;
