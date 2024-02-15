'use client';

import { useState } from 'react';
import MainStyleButton from '@/components/MainStyleButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const CreateMGC = () => {
  const [daySelected, setDaySelected] = useState('');

  console.log(daySelected);
  return (
    <section>
      <Label className="flex items-center">
        <Input placeholder="모각코 제목을 입력해주세요" />
      </Label>

      <Label className="flex items-center">
        <p className="w-150pxr">* 날짜 </p>
        <Input
          type="date"
          onChange={(e) => setDaySelected(e.target.value)}
        />
      </Label>

      <MainStyleButton content="완료" />
    </section>
  );
};

export default CreateMGC;
