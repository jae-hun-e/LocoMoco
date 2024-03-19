'use client';

import React from 'react';
import { useThunderModalStore } from '@/store/thunderModalStore';

const HeaderOptionContent = () => {
  const { toggleModal } = useThunderModalStore();

  return (
    <div>
      <button onClick={toggleModal}>신고</button>
    </div>
  );
};

export default HeaderOptionContent;
