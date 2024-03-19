'use client';

import React from 'react';
import { useThunderModalStore } from '@/store/thunderModalStore';

const HeaderOptionContent = () => {
  const { toggleModal } = useThunderModalStore();

  const handleReportClick = () => {
    toggleModal();
  };

  return (
    <div>
      <button onClick={handleReportClick}>신고</button>
    </div>
  );
};

export default HeaderOptionContent;
